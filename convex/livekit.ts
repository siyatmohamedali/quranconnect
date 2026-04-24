"use node";

import { v } from "convex/values";
import { AccessToken } from "livekit-server-sdk";
import { action } from "./_generated/server";

export const generateToken = action({
  args: {
    roomName: v.string(),
    firstName: v.string(),
  },
  handler: async (ctx, args) => {
    // 1. Get your keys from environment variables
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new Error("LiveKit API keys are not configured in Convex dashboard");
    }

    // 2. Create the token
    const at = new AccessToken(apiKey, apiSecret, {
      identity: args.firstName,
    });

    // 3. Set permissions (Grants)
    at.addGrant({ 
      roomJoin: true, 
      room: args.roomName, 
      canPublish: true, 
      canSubscribe: true 
    });

    // 4. Return the encrypted token string
    return await at.toJwt();
  },
});