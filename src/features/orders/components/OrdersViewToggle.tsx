import { List, LayoutGrid } from "lucide-react";
import { useOrdersStore } from "../../../store/orderStore";
import { cn } from "../../../lib/utils";

export default function OrdersViewToggle() {
  const { viewMode, setViewMode } = useOrdersStore();

  return (
    <div className="flex items-center gap-1 rounded-xl border bg-card p-1">
      <button
        onClick={() => setViewMode("list")}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition",
          viewMode === "list"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted",
        )}>
        <List className="h-4 w-4" />
      </button>

      <button
        onClick={() => setViewMode("grid")}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition",
          viewMode === "grid"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted",
        )}>
        <LayoutGrid className="h-4 w-4" />
      </button>
    </div>
  );
}
