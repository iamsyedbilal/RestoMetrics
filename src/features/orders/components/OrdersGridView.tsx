import type { Order } from "../../../types/orderTypes";
import OrderGridCard from "./OrderGridCard";

type Props = {
  orders: Order[];
};

export function OrdersGridView({ orders }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {orders.map((order) => (
        <OrderGridCard key={order.id} order={order} />
      ))}
    </div>
  );
}
