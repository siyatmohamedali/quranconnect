import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(), 
    gender: v.optional(v.union(v.literal("male"), v.literal("female"))),
    status: v.union(v.literal("idle"), v.literal("waiting"), v.literal("in-call")),
    currentChannel: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  queue: defineTable({
    userId: v.id("users"),
    gender: v.union(v.literal("male"), v.literal("female")),
    entryTime: v.number(),
  }).index("by_gender", ["gender", "entryTime"]),

  matches: defineTable({
    user1: v.id("users"),
    user2: v.id("users"),
    channelName: v.string(),
    active: v.boolean(),
  }).index("by_channel", ["channelName"]),
});