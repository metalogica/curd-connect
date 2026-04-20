import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import type { ReviewCardProps } from "@/components/reviews/ReviewCard";

export function useStoreDetail(storeId: Id<"stores">) {
  const store = useQuery(api.stores.getPublicStoreById, { storeId });
  const reviews = useQuery(api.reviews.listPublicReviewsByStore, { storeId });
  const rating = useQuery(api.reviews.getPublicStoreRating, { storeId });
  const creator = useQuery(
    api.users.getPublicUserById,
    store ? { userId: store.createdBy } : "skip",
  );

  const isLoading =
    store === undefined || reviews === undefined || rating === undefined;

  const reviewCards: ReviewCardProps[] = (reviews ?? []).map((r) => ({
    reviewId: r._id,
    authorId: r.authorId,
    authorHandle: r.authorHandle,
    authorAvatarUrl: r.authorAvatarUrl,
    rating: r.rating,
    body: r.body,
    createdAt: r._creationTime,
  }));

  return {
    store: store ?? null,
    reviewCards,
    reviewCount: rating?.count ?? 0,
    avgRating: rating?.average ?? null,
    creatorHandle: creator?.handle ?? null,
    isLoading,
  };
}
