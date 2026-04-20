import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { Rating } from "@domain/rating";
import { ReviewBody } from "@domain/review-body";

export function useCreateReview() {
  const createReview = useMutation(api.reviews.createReview);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit({
    storeId,
    rating,
    body,
  }: {
    storeId: Id<"stores">;
    rating: number;
    body: string;
  }): Promise<Id<"reviews"> | null> {
    setError(null);

    const ratingResult = Rating.parse({ value: rating });
    if (ratingResult.isErr()) {
      setError("Rating must be 1 to 5.");
      return null;
    }
    const bodyResult = ReviewBody.parse({ raw: body });
    if (bodyResult.isErr()) {
      setError("Write a comment.");
      return null;
    }

    setIsSubmitting(true);
    try {
      return await createReview({
        storeId,
        rating: ratingResult.value.value,
        body: bodyResult.value.value,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, error };
}
