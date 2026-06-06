import DataTable from "../../../components/shared/DataTable";
import { TableCell, TableRow } from "../../../components/ui/table";
import { useRecentOrders } from "../hooks/useDashboard";
import { useOrderModalStore } from "../../../store/orderModalStore";
import type { RecentOrder } from "../../../types/recentOrderProps";
import { getStatusBadge } from "../../../lib/statusBadge";
import { Badge } from "../../../components/ui/badge";

export default function RecentOrders() {
  const { data = [], isPending } = useRecentOrders();
  const { setOrder } = useOrderModalStore();

  const columns = [
    { label: "Order" },
    { label: "Customer" },
    { label: "Type" },
    { label: "Status" },
    { label: "Amount", align: "right" as const },
  ];

  if (isPending) {
    return (
      <div className="rounded-xl border bg-card p-4">
        <div className="h-40 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-2 p-5 flex items-center justify-between">
        <h2 className="text-base font-semibold">Recent Orders</h2>
        <span className="text-xs text-muted-foreground">
          Latest {data.length || 0} orders
        </span>
      </div>
      <DataTable columns={columns}>
        {(data as RecentOrder[]).map((order) => (
          <TableRow key={order.id} className="hover:bg-muted/30 transition">
            <TableCell>
              <button
                onClick={() => setOrder(order.id)}
                className="text-primary hover:underline font-medium cursor-pointer">
                #{order.id.slice(0, 6)}
              </button>
            </TableCell>

            <TableCell>{order.customers?.[0]?.name ?? "Guest"}</TableCell>

            <TableCell>
              <Badge
                className={`${getStatusBadge(order.status)} capitalize text-muted-foreground`}>
                {order.order_type}
              </Badge>
            </TableCell>

            <TableCell className="capitalize">{order.status}</TableCell>

            <TableCell className="text-right font-semibold">
              PKR {order.total_amount.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </>
  );
}
