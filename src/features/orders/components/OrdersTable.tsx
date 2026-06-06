import { useOrders } from "../hooks/userOrder";
import OrdersPagination from "./OrdersPagination";
import OrdersViewToggle from "./OrdersViewToggle";
import OrderGridCard from "./OrderGridCard";
import { useOrdersStore } from "../../../store/orderStore";
import Loading from "../../../components/shared/Loading";
import EmptyState from "../../../components/shared/EmptyState";
import { OrdersListView } from "./OrdersListView";

export default function OrdersTable() {
  const { data, isPending } = useOrders();
  const { viewMode } = useOrdersStore();

  const orders = data?.data ?? [];
  const total = data?.total ?? 0;

  if (isPending) return <Loading />;

  if (!orders.length) return <EmptyState text="Order" />;

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex justify-end">
        <OrdersViewToggle />
      </div>
      {viewMode === "list" ? (
        <OrdersListView orders={orders} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <OrderGridCard key={order.id} order={order} />
          ))}
        </div>
      )}
      <OrdersPagination total={total} />
    </div>
  );
}
