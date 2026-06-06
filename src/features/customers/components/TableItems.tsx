import { TableCell, TableRow } from "../../../components/ui/table";

type Order = {
  id: string;
  status: "pending" | "preparing" | "delivered" | "cancelled";
  created_at: string;
  order_type: "dine-in" | "delivery";
  total_amount: number;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalSpend?: number;
  orders: Order[];
};

type TableItemsProps = {
  customer: Customer;
};

export default function TableItems({ customer }: TableItemsProps) {
  const totalSpent = customer.orders
    .filter((order) => order.status === "delivered")
    .reduce((sum, order) => sum + order.total_amount, 0);

  return (
    <TableRow key={customer.id}>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">{customer.name}</span>
        </div>
      </TableCell>

      <TableCell className="text-muted-foreground">{customer.email}</TableCell>

      <TableCell>{customer.phone || "-"}</TableCell>

      <TableCell className="text-center">{customer.orders.length}</TableCell>

      <TableCell className="text-right font-medium">
        Rs. {totalSpent.toLocaleString()}
      </TableCell>
    </TableRow>
  );
}
