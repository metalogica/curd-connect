import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { FeedCardProps } from "@/components/feed/FeedCard";

export function useFeed() {
  const data = useQuery(api.reviews.listPublicFeed, {});
  const isLoading = data === undefined;

  const items: FeedCardProps[] = (data ?? []).map((row) => ({
    reviewId: row._id,
    storeId: row.storeId,
    storeName: row.storeName,
    authorId: row.authorId,
    authorHandle: row.authorHandle,
    rating: row.rating,
    body: row.body,
    createdAt: row._creationTime,
  }));

  return { items, isLoading };
}
