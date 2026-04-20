import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    handle: v.string(),
    avatarUrl: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  stores: defineTable({
    name: v.string(),
    address: v.string(),
    neighbourhood: v.string(),
    description: v.string(),
    gallery: v.array(v.string()),
    createdBy: v.id("users"),
  }).index("by_creator", ["createdBy"]),

  reviews: defineTable({
    storeId: v.id("stores"),
    authorId: v.id("users"),
    rating: v.union(
      v.literal(1),
      v.literal(2),
      v.literal(3),
      v.literal(4),
      v.literal(5),
    ),
    body: v.string(),
  })
    .index("by_store", ["storeId"])
    .index("by_author", ["authorId"]),
});
