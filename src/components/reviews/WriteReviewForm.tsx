import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Id } from "@convex/_generated/dataModel";

const LABELS: Record<number, string> = {
  1: "Trash can / Poubelle",
  2: "Meh / Bof",
  3: "It does the job / Ça passe",
  4: "Solid curds / Crissement bon",
  5: "Legendary / Poutine de rêve",
};

export type WriteReviewFormValues = { rating: number; body: string };

export function WriteReviewForm({
  storeId,
  storeName,
  onSubmit,
  isSubmitting,
  error,
}: {
  storeId: Id<"stores">;
  storeName: string;
  onSubmit: (values: WriteReviewFormValues) => void | Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [body, setBody] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void onSubmit({ rating, body });
  };

  const disabled = rating === 0 || body.trim().length === 0 || isSubmitting;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="border-b-4 border-black pb-4 mb-8">
        <h1 className="font-sans text-6xl tracking-tighter font-black uppercase text-black leading-none">
          Leave an<br />Avis
        </h1>
        <p className="font-mono text-black font-bold mt-4 uppercase">for {storeName}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border-4 border-black p-6 md:p-8 brutal-shadow space-y-8"
      >
        <div>
          <label className="block font-black uppercase mb-4 text-xl">The Score (1-5)</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className="focus:outline-none transition-transform hover:scale-110"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  size={48}
                  strokeWidth={1.5}
                  className={`${
                    star <= (hoverRating || rating)
                      ? "fill-curd text-black scale-110 drop-shadow-[2px_2px_0px_#171717]"
                      : "text-gray-300"
                  } transition-all`}
                />
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm font-bold uppercase opacity-60 h-6">
            {rating > 0 ? LABELS[rating] : ""}
          </p>
        </div>

        <div>
          <label htmlFor="body" className="block font-black uppercase mb-2 text-xl">
            Ton Commentaire
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            className="w-full border-4 border-black p-4 font-mono focus:outline-none focus:bg-white transition-colors resize-y shadow-[inset_4px_4px_0px_rgba(0,0,0,0.05)]"
            placeholder="Tell us about the gravy consistency, curd squeakiness, and fry temp..."
            required
          />
        </div>

        {error && (
          <div className="border-4 border-black bg-red-200 p-3 font-mono text-sm font-bold uppercase">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <Link
            to="/store/$id"
            params={{ id: storeId }}
            className="px-6 py-4 border-4 border-black font-black uppercase hover:bg-black hover:text-white transition-colors brutal-shadow active:shadow-none active:translate-x-1 active:translate-y-1 bg-gray-200 text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={disabled}
            className="flex-1 bg-black text-white font-black uppercase py-4 border-4 border-black hover:bg-white hover:text-black transition-colors brutal-shadow active:shadow-none active:translate-x-1 active:translate-y-1 text-lg tracking-widest disabled:opacity-50"
          >
            {isSubmitting ? "Envoi..." : "Post Review"}
          </button>
        </div>
      </form>
    </div>
  );
}
