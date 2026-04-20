import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Id } from "@convex/_generated/dataModel";

export type ReviewCardProps = {
  reviewId: Id<"reviews">;
  authorId: Id<"users"> | null;
  authorHandle: string | null;
  authorAvatarUrl: string | null;
  rating: number;
  body: string;
  createdAt: number;
};

export function ReviewCard({
  authorId,
  authorHandle,
  authorAvatarUrl,
  rating,
  body,
  createdAt,
}: ReviewCardProps) {
  return (
    <article className="bg-white border-4 border-black p-6 brutal-shadow flex flex-col md:flex-row gap-6">
      <div className="flex items-center md:flex-col md:items-start gap-4 md:w-48 shrink-0">
        {authorAvatarUrl && (
          <img
            src={authorAvatarUrl}
            alt={authorHandle ?? "avatar"}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-black"
          />
        )}
        <div className="flex flex-col">
          {authorId && authorHandle ? (
            <Link
              to="/profile/$id"
              params={{ id: authorId }}
              className="font-bold border-b-2 border-transparent hover:border-black"
            >
              {authorHandle}
            </Link>
          ) : (
            <span className="font-bold opacity-60">anonymous</span>
          )}
          <span className="text-xs font-bold uppercase opacity-60">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>

      <div className="flex-1 border-t-2 md:border-t-0 md:border-l-2 border-black pt-4 md:pt-0 md:pl-6 flex flex-col">
        <div className="flex mb-3 gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={20}
              className={star <= rating ? "fill-curd text-black" : "text-gray-300"}
            />
          ))}
        </div>
        <p className="font-serif italic text-lg leading-relaxed">"{body}"</p>
      </div>
    </article>
  );
}
