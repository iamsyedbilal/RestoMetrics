export default function Logo() {
  return (
    <div className="mb-6 flex items-center justify-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
        <span className="text-primary-foreground font-bold">R</span>
      </div>

      <span className="text-xl font-semibold tracking-tight text-foreground">
        RestoMetrics
      </span>
    </div>
  );
}
