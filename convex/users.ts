import { v } from "convex/values";
import { query, internalMutation } from "./_generated/server";
import { requireAuth } from "./_lib/auth";
import { Handle } from "../domain/handle";

export const getPublicUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db.get(userId);
  },
});

export const getMe = query({
  args: {},
  handler: async (ctx) => {
    const { user } = await requireAuth(ctx);
    return user;
  },
});

export const upsertFromClerk = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    rawHandle: v.string(),
    avatarUrl: v.string(),
  },
  handler: async (ctx, { clerkId, email, rawHandle, avatarUrl }) => {
    const handleResult = Handle.parse({ raw: rawHandle });
    if (handleResult.isErr()) {
      throw new Error(
        `Invalid handle from Clerk: ${handleResult.error._tag === "ValidationError" ? handleResult.error.reason : "unknown"}`,
      );
    }
    const handle = handleResult.value.display;

    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { email, handle, avatarUrl });
      return existing._id;
    }

    return await ctx.db.insert("users", {
      clerkId,
      email,
      handle,
      avatarUrl,
    });
  },
});
