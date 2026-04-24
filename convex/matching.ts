import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

// Join the matching queue
export const enterQueue = mutation({
  args: { userId: v.id("users"), gender: v.union(v.literal("male"), v.literal("female")) },
  handler: async (ctx, args) => {
    // 1. Check if user is already in queue to prevent duplicates
    const existingEntry = await ctx.db
      .query("queue")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .unique();

    if (existingEntry) return existingEntry._id;

    // 2. Update user status
    await ctx.db.patch(args.userId, { status: "waiting" });

    // 3. Add to queue
    const queueId = await ctx.db.insert("queue", {
      userId: args.userId,
      gender: args.gender,
      entryTime: Date.now(),
    });

    return queueId;
  },
});

// Leave the queue (if they cancel)
export const leaveQueue = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query("queue")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .unique();

    if (entry) await ctx.db.delete(entry._id);
    await ctx.db.patch(args.userId, { status: "idle" });
  },
});

// Check if a match was found (Frontend polls this via useQuery)
export const checkMatch = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    if (!args.userId) return null;

    // FIX: Using .first() instead of .unique() to handle 
    // cases where multiple match rows might exist accidentally.
    const match = await ctx.db
      .query("matches")
      .filter((q) => 
        q.and(
          q.or(
            q.eq(q.field("user1"), args.userId), 
            q.eq(q.field("user2"), args.userId)
          ),
          q.eq(q.field("active"), true)
        )
      )
      .order("desc") // Ensures we get the most recent match
      .first(); 

    return match;
  },
});

/**
 * THE PAIRING ENGINE
 * Called by convex/crons.ts every few seconds.
 * It pairs users of the same gender to maintain the digital sanctuary privacy.
 */
export const runPairing = internalMutation({
  args: {},
  handler: async (ctx) => {
    const genders: ("male" | "female")[] = ["male", "female"];

    for (const gender of genders) {
      // Find the two users who have been waiting the longest for this gender
      const waitingUsers = await ctx.db
        .query("queue")
        .withIndex("by_gender", (q) => q.eq("gender", gender))
        .order("asc")
        .take(2);

      if (waitingUsers.length >= 2) {
        const [u1, u2] = waitingUsers;
        
        // Generate a unique channel name for the video/audio call
        const channelName = `room_${Math.random().toString(36).substring(7)}`;

        // 1. Create the Match record
        await ctx.db.insert("matches", {
          user1: u1.userId,
          user2: u2.userId,
          channelName: channelName,
          active: true,
        });

        // 2. Update both users to 'in-call' status
        await ctx.db.patch(u1.userId, { 
          status: "in-call", 
          currentChannel: channelName 
        });
        await ctx.db.patch(u2.userId, { 
          status: "in-call", 
          currentChannel: channelName 
        });

        // 3. Remove them from the queue so they aren't matched again
        await ctx.db.delete(u1._id);
        await ctx.db.delete(u2._id);

        console.log(`Successfully matched ${gender} users: ${u1.userId} & ${u2.userId}`);
      }
    }
  },
});