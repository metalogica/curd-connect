export function StoreGallery({ name, gallery }: { name: string; gallery: string[] }) {
  if (gallery.length === 0) {
    return (
      <div className="flex-1 bg-gray-200 flex items-center justify-center min-h-[300px] font-bold uppercase p-4 text-center">
        No photos uploadées yet.
      </div>
    );
  }
  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
      {gallery.slice(0, 4).map((url, i) => (
        <img
          key={i}
          src={url}
          alt={`${name} gallery ${i}`}
          className={`w-full h-full object-cover min-h-[200px] bg-gray-200 border-black ${
            i > 0
              ? i % 2 === 0
                ? "border-t-4 border-r-0"
                : "border-t-4 border-l-4"
              : "border-r-4"
          }`}
        />
      ))}
    </div>
  );
}
