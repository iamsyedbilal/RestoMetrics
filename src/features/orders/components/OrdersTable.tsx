import { useOrders } from "../hooks/userOrder";
import OrdersPagination from "./OrdersPagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { format } from "date-fns";
import OrdersViewToggle from "./OrdersViewToggle";
import OrderGridCard from "./OrderGridCard";
import { useOrdersStore } from "../../../store/orderStore";
import { getStatusBadge } from "../../../lib/statusBadge";
import { useOrderModalStore } from "../../../store/orderModalStore";
import type { Order } from "../../../types/orderTypes";

export default function OrdersTable() {
  const { data, isPending } = useOrders();
  const { viewMode } = useOrdersStore();
  const { setOrder } = useOrderModalStore();

  const orders = data?.data ?? [];
  const total = data?.total ?? 0;

  if (isPending) {
    return <div className="h-64 animate-pulse rounded-xl bg-muted" />;
  }

  if (!orders.length) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border bg-card">
        <p className="text-sm text-muted-foreground">No orders found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex justify-end">
        <OrdersViewToggle />
      </div>

      {/* LIST VIEW */}
      {viewMode === "list" && (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="text-xs">Order</TableHead>
                <TableHead className="text-xs">Customer</TableHead>
                <TableHead className="text-xs">Type</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-right text-xs">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {(orders as Order[]).map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <button
                      onClick={() => setOrder(order.id)}
                      className="text-primary hover:underline font-medium">
                      #{order.id.slice(0, 6)}
                    </button>
                  </TableCell>
                  <TableCell>{order.customers?.name}</TableCell>
                  <TableCell className="capitalize">
                    {order.order_type}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusBadge(order.status)} border px-2 py-0 text-xs`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.created_at), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    PKR {order.total_amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(orders as Order[]).map((order) => (
            <OrderGridCard key={order.id} order={order} />
          ))}
        </div>
      )}

      <OrdersPagination total={total} />
    </div>
  );
}
