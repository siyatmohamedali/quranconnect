import { mutation } from "./_generated/server";

export const startMatching = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user || !user.gender) throw new Error("User must select gender first");

    const partnerInQueue = await ctx.db
      .query("queue")
      .withIndex("by_gender", (q) => q.eq("gender", user.gender!))
      .order("asc")
      .first();

    if (partnerInQueue && partnerInQueue.userId !== user._id) {
      const channelName = `halal_room_${Math.random().toString(36).substring(7)}`;

      await ctx.db.insert("matches", {
        user1: partnerInQueue.userId,
        user2: user._id,
        channelName,
        active: true,
      });

      await ctx.db.delete(partnerInQueue._id);
      await ctx.db.patch(user._id, { status: "in-call", currentChannel: channelName });
      await ctx.db.patch(partnerInQueue.userId, { status: "in-call", currentChannel: channelName });

      return { channelName, matched: true };
    }

    await ctx.db.insert("queue", {
      userId: user._id,
      gender: user.gender,
      entryTime: Date.now(),
    });
    
    await ctx.db.patch(user._id, { status: "waiting" });
    return { matched: false };
  },
});