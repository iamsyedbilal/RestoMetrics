import { Badge } from "../../../components/ui/badge";
import { TableCell, TableRow } from "../../../components/ui/table";
import type { Order } from "../../../types/orderTypes";
import { getStatusBadge } from "../../../lib/statusBadge";
import { format } from "date-fns";

type Props = {
  order: Order;
  onSelect: (id: string) => void;
};

export function OrderRow({ order, onSelect }: Props) {
  console.log(order);
  return (
    <TableRow>
      <TableCell>
        <button
          onClick={() => onSelect(order.id)}
          className="text-primary hover:underline font-medium">
          #{order.id.slice(0, 6)}
        </button>
      </TableCell>

      <TableCell>{order.customers?.name ?? "Guest"}</TableCell>

      <TableCell className="capitalize">{order.order_type}</TableCell>

      <TableCell>
        <Badge
          className={`${getStatusBadge(order.status)} border px-2 py-0 text-xs`}>
          {order.status}
        </Badge>
      </TableCell>

      <TableCell>{format(new Date(order.created_at), "dd MMM yyyy")}</TableCell>

      <TableCell className="text-right">
        PKR {order.total_amount.toLocaleString()}
      </TableCell>
    </TableRow>
  );
}
