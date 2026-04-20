import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import type { Id } from "@convex/_generated/dataModel";

export type ProfileStoreRow = {
  storeId: Id<"stores">;
  name: string;
  neighbourhood: string;
  coverImage: string | null;
};

export function UserStoreList({ stores }: { stores: ProfileStoreRow[] }) {
  return (
    <div className="space-y-6">
      <h2 className="font-sans tracking-tighter text-3xl font-black uppercase border-b-4 border-black pb-2 text-black">
        Restos Discoveries
      </h2>
      {stores.length === 0 ? (
        <p className="font-bold uppercase opacity-60 flex-1">None yet.</p>
      ) : (
        stores.map((store) => (
          <div
            key={store.storeId}
            className="border-4 border-black bg-white p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 relative group"
          >
            <Link
              to="/store/$id"
              params={{ id: store.storeId }}
              className="absolute inset-0 z-0 hover:bg-gray-50 transition-colors"
            >
              <span className="sr-only">View Store</span>
            </Link>
            <img
              src={store.coverImage ?? "https://picsum.photos/seed/poutine/100"}
              alt={store.name}
              className="w-16 h-16 object-cover border-2 border-black relative z-10 pointer-events-none"
            />
            <div className="relative z-10 pointer-events-none flex-1 truncate">
              <h3 className="font-black text-lg uppercase truncate underline decoration-2">
                {store.name}
              </h3>
              <p className="text-xs font-bold font-mono text-gray-500 uppercase truncate">
                <MapPin size={10} className="inline mr-1" />
                {store.neighbourhood}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
