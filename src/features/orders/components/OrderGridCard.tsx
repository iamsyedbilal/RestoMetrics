import { format } from "date-fns";
import { Badge } from "../../../components/ui/badge";
import { getStatusBadge } from "../../../lib/statusBadge";
import { useOrderModalStore } from "../../../store/orderModalStore";
import type { Order } from "../../../types/orderTypes";

export default function OrderGridCard({ order }: { order: Order }) {
  const { setOrder } = useOrderModalStore();
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setOrder(order.id)}
          className="text-primary hover:underline font-medium">
          #{order.id.slice(0, 6)}
        </button>

        <span className="text-xs text-muted-foreground">
          {format(new Date(order.created_at), "dd MMM")}
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        {order.customers?.name || "Guest"}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm font-semibold">
          PKR {order.total_amount.toLocaleString()}
        </p>

        <span className="rounded-full bg-muted px-2 py-1 text-xs">
          <Badge
            className={`${getStatusBadge(order.status)} border px-2 py-0 text-xs`}>
            {order.status}
          </Badge>
        </span>
      </div>
    </div>
  );
}
