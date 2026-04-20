import { formatDistanceToNow } from "date-fns";

export function ProfileHeader({
  handle,
  avatarUrl,
  joinedAt,
  reviewCount,
  storeCount,
}: {
  handle: string;
  avatarUrl: string;
  joinedAt: number;
  reviewCount: number;
  storeCount: number;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 border-4 border-black bg-white p-8 brutal-shadow">
      <img
        src={avatarUrl}
        alt={handle}
        className="w-32 h-32 md:w-48 md:h-48 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      />
      <div>
        <h1 className="font-sans text-5xl md:text-7xl font-black uppercase text-black leading-none mb-2 tracking-tighter">
          {handle}
        </h1>
        <p className="font-mono text-black font-bold uppercase tracking-wider">
          Joined {formatDistanceToNow(new Date(joinedAt), { addSuffix: true })}
        </p>
        <div className="flex gap-4 mt-6">
          <div className="bg-curd border-2 border-black px-4 py-2 font-black uppercase">
            <span className="text-2xl mr-2">{reviewCount}</span> Avis
          </div>
          <div className="bg-gray-100 border-2 border-black px-4 py-2 font-black uppercase">
            <span className="text-2xl mr-2">{storeCount}</span> Restos added
          </div>
        </div>
      </div>
    </div>
  );
}
