import { createFileRoute } from "@tanstack/react-router";
import { FeedList } from "@/components/feed/FeedList";
import { useFeed } from "@/hooks/useFeed";

function FeedPage() {
  const { items, isLoading } = useFeed();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] font-mono uppercase tracking-widest text-sm">
        Chargement…
      </div>
    );
  }
  return <FeedList items={items} />;
}

export const Route = createFileRoute("/")({
  component: FeedPage,
});
