import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { Id } from "@convex/_generated/dataModel";
import { WriteReviewForm } from "@/components/reviews/WriteReviewForm";
import { useStoreDetail } from "@/hooks/useStoreDetail";
import { useCreateReview } from "@/hooks/useCreateReview";

function WriteReviewPage() {
  const { id } = Route.useParams();
  const storeId = id as Id<"stores">;
  const navigate = useNavigate();
  const { store, isLoading } = useStoreDetail(storeId);
  const { submit, isSubmitting, error } = useCreateReview();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] font-mono uppercase tracking-widest text-sm">
        Chargement…
      </div>
    );
  }
  if (!store) {
    return <div>Store not found.</div>;
  }

  return (
    <WriteReviewForm
      storeId={storeId}
      storeName={store.name}
      isSubmitting={isSubmitting}
      error={error}
      onSubmit={async ({ rating, body }) => {
        const reviewId = await submit({ storeId, rating, body });
        if (reviewId) await navigate({ to: "/store/$id", params: { id: storeId } });
      }}
    />
  );
}

export const Route = createFileRoute("/_authenticated/store/$id/review")({
  component: WriteReviewPage,
});
