import FilterTabs from "../../../components/shared/FilterTabs";
import { useOrdersStore, type OrderStatus } from "../../../store/orderStore";

const filters: { label: string; value: OrderStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Preparing", value: "preparing" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export default function OrdersFilters() {
  const { status, setStatus } = useOrdersStore();

  return <FilterTabs items={filters} value={status} onChange={setStatus} />;
}
