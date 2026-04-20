import { Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import type { Id } from "@convex/_generated/dataModel";

export type FeedCardProps = {
  reviewId: Id<"reviews">;
  storeId: Id<"stores">;
  storeName: string;
  authorId: Id<"users">;
  authorHandle: string;
  rating: number;
  body: string;
  createdAt: number;
};

export function FeedCard({
  storeId,
  storeName,
  authorId,
  authorHandle,
  rating,
  body,
  createdAt,
}: FeedCardProps) {
  const excerpt = body.length > 150 ? body.slice(0, 150) + "..." : body;
  return (
    <article className="border-4 border-black bg-white flex flex-col brutal-shadow hover:bg-gray-50 transition-colors p-4 relative">
      <Link to="/store/$id" params={{ id: storeId }} className="absolute inset-0 z-0">
        <span className="sr-only">View Store</span>
      </Link>

      <div className="flex justify-between items-start mb-2 relative z-10 pointer-events-none">
        <h3 className="font-black text-xl leading-none underline decoration-2">{storeName}</h3>
        <span className="bg-curd px-2 py-1 border-2 border-black font-black text-xs uppercase italic shrink-0 whitespace-nowrap ml-2">
          {rating}/5 CURDS
        </span>
      </div>

      <p className="font-serif italic text-sm mb-4 flex-1 relative z-10 pointer-events-none">
        "{excerpt}"
      </p>

      <div className="flex justify-between items-end text-[10px] font-mono tracking-wider uppercase relative z-20 pointer-events-auto border-t-2 border-black pt-2">
        <Link
          to="/profile/$id"
          params={{ id: authorId }}
          className="hover:underline decoration-2 hover:text-gravy"
        >
          BY {authorHandle}
        </Link>
        <span className="opacity-70 text-right">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </div>
    </article>
  );
}
