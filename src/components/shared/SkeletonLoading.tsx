export default function SkeletonLoading() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-32 animate-pulse rounded-2xl border bg-muted"
        />
      ))}
    </div>
  );
}
