import { MapPin, Star } from "lucide-react";
import { StoreGallery } from "./StoreGallery";

export type StoreHeaderProps = {
  name: string;
  neighbourhood: string;
  description: string;
  gallery: string[];
  creatorHandle: string | null;
  avgRating: number | null;
  reviewCount: number;
};

export function StoreHeader({
  name,
  neighbourhood,
  description,
  gallery,
  creatorHandle,
  avgRating,
  reviewCount,
}: StoreHeaderProps) {
  return (
    <div className="border-4 border-black bg-white flex flex-col md:flex-row brutal-shadow relative">
      <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center border-b-4 md:border-b-0 md:border-r-4 border-black bg-curd">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-2">
          <MapPin size={16} /> {neighbourhood}
        </div>
        <h1 className="font-sans text-5xl md:text-7xl font-black uppercase text-black leading-none mb-6">
          {name}
        </h1>
        <p className="font-serif italic text-lg md:text-xl font-bold leading-snug border-l-4 border-black pl-4 py-2">
          "{description}"
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-bold uppercase">
          <div className="bg-white border-2 border-black px-3 py-1 flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Star className="fill-black" size={16} />{" "}
            {avgRating === null ? "—" : avgRating.toFixed(1)}{" "}
            <span className="opacity-50">({reviewCount})</span>
          </div>
          <div className="bg-white border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Added by {creatorHandle ?? "Unknown"}
          </div>
        </div>
      </div>
      <div className="md:w-1/2 min-h-[300px] h-full flex flex-col border-black relative">
        <StoreGallery name={name} gallery={gallery} />
      </div>
    </div>
  );
}
