import { cn } from "../../../lib/utils";
import { useOrdersStore, type OrderStatus } from "../../../store/orderStore";

const filters: { label: string; value: OrderStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Preparing", value: "preparing" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export default function OrdersFilters() {
  const { status, setStatus } = useOrdersStore();
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border bg-card p-1 shadow-sm">
        {filters.map((item) => {
          const active = status === item.value;

          return (
            <button
              key={item.value}
              onClick={() => setStatus(item.value)}
              className={cn(
                "relative whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all",
                "hover:text-foreground",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted",
              )}>
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
