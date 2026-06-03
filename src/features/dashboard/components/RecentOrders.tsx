import { useRecentOrders } from "../hooks/useDashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import type { RecentOrder } from "../../../types/recentOrderProps";

function getStatusBadge(status: string) {
  switch (status) {
    case "delivered":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "pending":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    case "preparing":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "cancelled":
      return "bg-red-500/10 text-red-600 border-red-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default function RecentOrders() {
  const { data = [], isPending } = useRecentOrders();

  if (isPending) {
    return (
      <div className="rounded-xl border bg-card p-4">
        <div className="h-40 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card  shadow-sm">
      <div className="mb-4 p-5 flex items-center justify-between">
        <h2 className="text-base font-semibold">Recent Orders</h2>
        <span className="text-xs text-muted-foreground">Latest 5 orders</span>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="text-xs">Order</TableHead>
              <TableHead className="text-xs">Customer</TableHead>
              <TableHead className="text-xs">Type</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-right text-xs">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(data as RecentOrder[]).map((order) => (
              <TableRow key={order.id} className="hover:bg-muted/30 transition">
                {/* Order ID */}
                <TableCell className="font-medium text-sm">
                  <span className="text-muted-foreground">#</span>
                  {order.id.slice(0, 6)}
                </TableCell>

                {/* Customer */}
                <TableCell className="text-sm font-medium">
                  {order.customers?.name || "Guest"}
                </TableCell>

                {/* Type */}
                <TableCell className="text-sm capitalize text-muted-foreground">
                  {order.order_type}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    className={`${getStatusBadge(order.status)} border px-2 py-0 text-xs`}>
                    {order.status}
                  </Badge>
                </TableCell>

                {/* Amount */}
                <TableCell className="text-right font-semibold text-sm">
                  PKR {order.total_amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
