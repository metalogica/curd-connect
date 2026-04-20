import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireAuth } from "./_lib/auth";

export const listPublicStores = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("stores").order("desc").collect();
  },
});

export const getPublicStoreById = query({
  args: { storeId: v.id("stores") },
  handler: async (ctx, { storeId }) => {
    return await ctx.db.get(storeId);
  },
});

export const listPublicStoresByCreator = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("stores")
      .withIndex("by_creator", (q) => q.eq("createdBy", userId))
      .order("desc")
      .collect();
  },
});

export const createStore = mutation({
  args: {
    name: v.string(),
    address: v.string(),
    neighbourhood: v.string(),
    description: v.string(),
    gallery: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { user } = await requireAuth(ctx);

    const name = args.name.trim();
    const address = args.address.trim();
    const neighbourhood = args.neighbourhood.trim();
    const description = args.description.trim();

    if (!name) throw new Error("Store name is required");
    if (!address) throw new Error("Store address is required");
    if (!neighbourhood) throw new Error("Neighbourhood is required");
    if (!description) throw new Error("Description is required");

    return await ctx.db.insert("stores", {
      name,
      address,
      neighbourhood,
      description,
      gallery: args.gallery,
      createdBy: user._id,
    });
  },
});
