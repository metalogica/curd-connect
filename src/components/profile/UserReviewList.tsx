import { Link } from "@tanstack/react-router";
import type { Id } from "@convex/_generated/dataModel";

export type ProfileReviewRow = {
  reviewId: Id<"reviews">;
  storeId: Id<"stores">;
  storeName: string | null;
  rating: number;
  body: string;
};

export function UserReviewList({
  handle,
  reviews,
}: {
  handle: string;
  reviews: ProfileReviewRow[];
}) {
  return (
    <div className="space-y-6">
      <h2 className="font-sans tracking-tighter text-3xl font-black uppercase border-b-4 border-black pb-2 text-black">
        Les Avis de {handle}
      </h2>
      {reviews.length === 0 ? (
        <p className="font-bold uppercase opacity-60">None yet.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.reviewId}
            className="border-4 border-black bg-white p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-2 relative group border-l-8 border-l-curd"
          >
            <Link
              to="/store/$id"
              params={{ id: review.storeId }}
              className="absolute inset-0 z-0"
            >
              <span className="sr-only">View Store</span>
            </Link>
            <div className="flex justify-between items-center relative z-10 pointer-events-none">
              <h3 className="font-black text-xl uppercase truncate pr-4 underline decoration-2">
                {review.storeName ?? "Unknown store"}
              </h3>
              <div className="flex bg-black text-white px-2 py-1 items-center gap-1 text-sm font-black">
                {review.rating}/5
              </div>
            </div>
            <p className="font-serif italic text-black text-sm line-clamp-3 relative z-10 pointer-events-none">
              "{review.body}"
            </p>
          </div>
        ))
      )}
    </div>
  );
}
