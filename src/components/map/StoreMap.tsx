import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { computeStorePinCoordinate } from "@domain/map-coordinate";
import { asPoutineStoreId } from "@domain/shared/types";
import type { Id } from "@convex/_generated/dataModel";

export type StoreMapStore = {
  _id: Id<"stores">;
  name: string;
  neighbourhood: string;
};

export function StoreMap({ stores }: { stores: StoreMapStore[] }) {
  const pinned = useMemo(
    () =>
      stores.map((store) => ({
        ...store,
        pin: computeStorePinCoordinate({ storeId: asPoutineStoreId(store._id) }),
      })),
    [stores],
  );

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="flex justify-between items-end mb-4 border-b-4 border-black pb-2">
        <h1 className="font-sans font-black text-5xl md:text-6xl uppercase tracking-tighter text-charcoal">
          La Carte
        </h1>
        <p className="font-bold uppercase tracking-widest text-sm hidden sm:block">
          Explore the Gravy Grid
        </p>
      </div>

      <div className="flex-1 border-4 border-black bg-[#E5E7EB] relative overflow-hidden brutal-shadow isolate">
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#000000 2px, transparent 2px), linear-gradient(90deg, #000000 2px, transparent 2px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute h-[150%] w-32 bg-blue-500/20 rotate-45 transform origin-top-left -left-20 top-0 border-r-4 border-black/30 pointer-events-none" />

        <div className="absolute inset-0 z-10 p-4 font-black lg:text-8xl text-black/10 font-sans text-4xl uppercase pointer-events-none select-none flex flex-col items-center justify-center">
          <span className="bg-[#E5E7EB] px-4 -rotate-[10deg] whitespace-nowrap border-y-4 border-black/20 text-center">
            Interactive Map /<br />
            Carte du Plateau
          </span>
        </div>

        {pinned.map((store) => (
          <Link
            to="/store/$id"
            params={{ id: store._id }}
            key={store._id}
            className="absolute z-20 group transform -translate-x-1/2 -translate-y-full"
            style={{ top: `${store.pin.topPct}%`, left: `${store.pin.leftPct}%` }}
          >
            <div className="relative">
              <div className="bg-gravy w-8 h-8 border-2 border-black rounded-full flex items-center justify-center text-white font-black text-xs cursor-pointer hover:scale-125 transition-transform shadow-[2px_2px_0px_0px_#FACC15]">
                P
              </div>
              <div className="absolute left-1/2 -ml-24 bottom-full mb-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center">
                <span className="font-black text-sm uppercase leading-tight text-center w-full truncate">
                  {store.name}
                </span>
                <span className="text-xs font-bold font-mono truncate w-full text-center text-gravy">
                  {store.neighbourhood}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
