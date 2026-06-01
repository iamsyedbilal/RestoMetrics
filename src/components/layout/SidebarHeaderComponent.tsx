export default function SidebarHeaderComponent() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shrink-0">
        R
      </div>
      <div>
        <p className="text-sm font-semibold tracking-tight text-sidebar-foreground">
          RestoMetrics
        </p>
      </div>
      <span className="text-[9px] font-semibold uppercase tracking-[0.8px] text-primary bg-primary/10 rounded px-1 py-0.5">
        Pro
      </span>
    </div>
  );
}
