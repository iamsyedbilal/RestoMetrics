import { Badge } from "../../../components/ui/badge";
import { TableCell, TableRow } from "../../../components/ui/table";
import type { Order } from "../../../types/orderTypes";
import { getStatusBadge } from "../../../lib/statusBadge";
import { format as formatDate } from "date-fns";
import { useFormatCurrency } from "../../../hooks/useCurrency";

type Props = {
  order: Order;
  onSelect: (id: string) => void;
};

export function OrderRow({ order, onSelect }: Props) {
  const format = useFormatCurrency();
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

      <TableCell>
        {formatDate(new Date(order.created_at), "dd MMM yyyy")}
      </TableCell>

      <TableCell className="text-right">{format(order.total_amount)}</TableCell>
    </TableRow>
  );
}
