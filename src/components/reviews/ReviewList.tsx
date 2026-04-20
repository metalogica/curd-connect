import { ReviewCard, type ReviewCardProps } from "./ReviewCard";

export function ReviewList({ reviews }: { reviews: ReviewCardProps[] }) {
  if (reviews.length === 0) {
    return (
      <div className="bg-white border-4 border-black p-8 brutal-shadow font-bold uppercase text-center text-lg">
        Aucun avis. Be the first to try their gravy!
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard key={review.reviewId} {...review} />
      ))}
    </div>
  );
}
