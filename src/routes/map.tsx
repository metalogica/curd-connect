import { createFileRoute } from "@tanstack/react-router";
import { StoreMap } from "@/components/map/StoreMap";
import { useStores } from "@/hooks/useStores";

function MapPage() {
  const { stores, isLoading } = useStores();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] font-mono uppercase tracking-widest text-sm">
        Chargement…
      </div>
    );
  }
  return <StoreMap stores={stores} />;
}

export const Route = createFileRoute("/map")({
  component: MapPage,
});
