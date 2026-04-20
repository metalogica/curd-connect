import { createFileRoute, Link } from "@tanstack/react-router";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { MessageSquarePlus } from "lucide-react";
import type { Id } from "@convex/_generated/dataModel";
import { StoreHeader } from "@/components/stores/StoreHeader";
import { ReviewList } from "@/components/reviews/ReviewList";
import { useStoreDetail } from "@/hooks/useStoreDetail";

function StoreDetailPage() {
  const { id } = Route.useParams();
  const storeId = id as Id<"stores">;
  const { store, reviewCards, reviewCount, avgRating, creatorHandle, isLoading } =
    useStoreDetail(storeId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] font-mono uppercase tracking-widest text-sm">
        Chargement…
      </div>
    );
  }
  if (!store) {
    return <div className="font-bold text-2xl uppercase">Store not found :(</div>;
  }

  return (
    <div className="space-y-12 pb-16">
      <StoreHeader
        name={store.name}
        neighbourhood={store.neighbourhood}
        description={store.description}
        gallery={store.gallery}
        creatorHandle={creatorHandle}
        avgRating={avgRating}
        reviewCount={reviewCount}
      />

      <div>
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 border-b-4 border-black pb-4 gap-4">
          <h2 className="font-sans text-4xl md:text-5xl font-black uppercase text-black tracking-tighter leading-none">
            Avis & Notes
          </h2>
          <SignedIn>
            <Link
              to="/store/$id/review"
              params={{ id: storeId }}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 brutal-shadow active:shadow-none active:translate-x-1 active:translate-y-1 hover:bg-white hover:text-black transition-colors border-4 border-black font-black uppercase whitespace-nowrap"
            >
              <MessageSquarePlus size={18} /> Laisser un avis
            </Link>
          </SignedIn>
          <SignedOut>
            <Link
              to="/sign-in"
              className="flex items-center gap-2 bg-white text-black px-4 py-2 brutal-shadow active:shadow-none active:translate-x-1 active:translate-y-1 hover:bg-black hover:text-white transition-colors border-4 border-black font-black uppercase whitespace-nowrap text-sm"
            >
              Sign in to review
            </Link>
          </SignedOut>
        </div>

        <ReviewList reviews={reviewCards} />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/store/$id")({
  component: StoreDetailPage,
});
