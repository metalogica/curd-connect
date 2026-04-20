import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireAuth } from "./_lib/auth";
import { Rating } from "../domain/rating";
import { ReviewBody } from "../domain/review-body";
import { AverageRating } from "../domain/average-rating";

const DEFAULT_FEED_LIMIT = 100;

const ratingValidator = v.union(
  v.literal(1),
  v.literal(2),
  v.literal(3),
  v.literal(4),
  v.literal(5),
);

export const listPublicFeed = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const reviews = await ctx.db
      .query("reviews")
      .order("desc")
      .take(limit ?? DEFAULT_FEED_LIMIT);

    return await Promise.all(
      reviews.map(async (review) => {
        const [store, author] = await Promise.all([
          ctx.db.get(review.storeId),
          ctx.db.get(review.authorId),
        ]);
        return {
          _id: review._id,
          _creationTime: review._creationTime,
          storeId: review.storeId,
          authorId: review.authorId,
          rating: review.rating,
          body: review.body,
          storeName: store?.name ?? "Unknown store",
          authorHandle: author?.handle ?? "@unknown",
          authorAvatarUrl: author?.avatarUrl ?? "",
        };
      }),
    );
  },
});

export const listPublicReviewsByStore = query({
  args: { storeId: v.id("stores") },
  handler: async (ctx, { storeId }) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_store", (q) => q.eq("storeId", storeId))
      .order("desc")
      .collect();

    return await Promise.all(
      reviews.map(async (review) => {
        const author = await ctx.db.get(review.authorId);
        return {
          _id: review._id,
          _creationTime: review._creationTime,
          storeId: review.storeId,
          authorId: review.authorId,
          rating: review.rating,
          body: review.body,
          authorHandle: author?.handle ?? null,
          authorAvatarUrl: author?.avatarUrl ?? null,
        };
      }),
    );
  },
});

export const listPublicReviewsByAuthor = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_author", (q) => q.eq("authorId", userId))
      .order("desc")
      .collect();

    return await Promise.all(
      reviews.map(async (review) => {
        const store = await ctx.db.get(review.storeId);
        return {
          _id: review._id,
          _creationTime: review._creationTime,
          storeId: review.storeId,
          authorId: review.authorId,
          rating: review.rating,
          body: review.body,
          storeName: store?.name ?? null,
        };
      }),
    );
  },
});

export const getPublicStoreRating = query({
  args: { storeId: v.id("stores") },
  handler: async (ctx, { storeId }) => {
    const rows = await ctx.db
      .query("reviews")
      .withIndex("by_store", (q) => q.eq("storeId", storeId))
      .collect();
    const avg = AverageRating.fromValues({ values: rows.map((r) => r.rating) });
    return { average: avg.mean, count: avg.count };
  },
});

export const createReview = mutation({
  args: {
    storeId: v.id("stores"),
    rating: ratingValidator,
    body: v.string(),
  },
  handler: async (ctx, { storeId, rating, body }) => {
    const { user } = await requireAuth(ctx);

    const store = await ctx.db.get(storeId);
    if (!store) throw new Error("Store not found");

    const ratingResult = Rating.parse({ value: rating });
    if (ratingResult.isErr()) {
      throw new Error(
        `Invalid rating: ${ratingResult.error._tag === "ValidationError" ? ratingResult.error.reason : "unknown"}`,
      );
    }

    const bodyResult = ReviewBody.parse({ raw: body });
    if (bodyResult.isErr()) {
      throw new Error(
        `Invalid review body: ${bodyResult.error._tag === "ValidationError" ? bodyResult.error.reason : "unknown"}`,
      );
    }

    return await ctx.db.insert("reviews", {
      storeId,
      authorId: user._id,
      rating: ratingResult.value.value,
      body: bodyResult.value.value,
    });
  },
});
