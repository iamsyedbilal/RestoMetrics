import DataTable from "../../../components/shared/DataTable";
import { useOrderModalStore } from "../../../store/orderModalStore";
import type { Order } from "../../../types/orderTypes";
import { OrderRow } from "./OrderRow";

type Props = {
  orders: Order[];
};

export function OrdersListView({ orders }: Props) {
  const { setOrder } = useOrderModalStore();

  const columns = [
    { label: "Order" },
    { label: "Customer" },
    { label: "Type" },
    { label: "Status" },
    { label: "Date" },
    { label: "Amount", align: "right" as const },
  ];

  return (
    <DataTable columns={columns}>
      {orders.map((order) => (
        <OrderRow key={order.id} order={order} onSelect={setOrder} />
      ))}
    </DataTable>
  );
}
