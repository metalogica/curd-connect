import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import type { ProfileReviewRow } from "@/components/profile/UserReviewList";
import type { ProfileStoreRow } from "@/components/profile/UserStoreList";

export function useUserProfile(userId: Id<"users">) {
  const user = useQuery(api.users.getPublicUserById, { userId });
  const reviews = useQuery(api.reviews.listPublicReviewsByAuthor, { userId });
  const stores = useQuery(api.stores.listPublicStoresByCreator, { userId });

  const isLoading =
    user === undefined || reviews === undefined || stores === undefined;

  const reviewRows: ProfileReviewRow[] = (reviews ?? []).map((r) => ({
    reviewId: r._id,
    storeId: r.storeId,
    storeName: r.storeName,
    rating: r.rating,
    body: r.body,
  }));

  const storeRows: ProfileStoreRow[] = (stores ?? []).map((s) => ({
    storeId: s._id,
    name: s.name,
    neighbourhood: s.neighbourhood,
    coverImage: s.gallery[0] ?? null,
  }));

  return {
    user: user ?? null,
    reviewRows,
    storeRows,
    reviewCount: reviewRows.length,
    storeCount: storeRows.length,
    isLoading,
  };
}
