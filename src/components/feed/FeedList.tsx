import { FeedCard, type FeedCardProps } from "./FeedCard";

export type FeedListProps = {
  items: FeedCardProps[];
};

export function FeedList({ items }: FeedListProps) {
  return (
    <div className="space-y-8 flex flex-col h-full">
      <div className="p-4 border-b-4 border-black bg-charcoal text-white flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(250,204,21,1)]">
        <span className="font-black uppercase text-2xl md:text-4xl tracking-tighter">
          Latest Activity
        </span>
        <span className="font-mono text-xs opacity-70 italic">En direct de MTL</span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border-4 border-black p-8 brutal-shadow font-bold uppercase text-center">
          Aucun avis pour le moment. Be the first curd connoisseur.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <FeedCard key={item.reviewId} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}
