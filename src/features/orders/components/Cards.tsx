import StatCard from "../../dashboard/components/StatCard";
import { useOrderMetrics } from "../hooks/userOrder";
import SkeletonLoading from "../../../components/shared/SkeletonLoading";

export default function Cards() {
  const { data, isPending } = useOrderMetrics();

  if (isPending) return <SkeletonLoading />;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 xl:grid-cols-5">
      <StatCard
        variant="orders"
        title="Total Orders"
        value={String(data?.totalOrders ?? 0)}
      />

      <StatCard
        variant="orders"
        title="Pending"
        value={String(data?.pendingOrders ?? 0)}
      />

      <StatCard
        variant="orders"
        title="Preparing"
        value={String(data?.preparingOrders ?? 0)}
      />

      <StatCard
        variant="orders"
        title="Delivered"
        value={String(data?.deliveredOrders ?? 0)}
      />

      <StatCard
        variant="orders"
        title="Cancelled"
        value={String(data?.cancelledOrders ?? 0)}
      />
    </div>
  );
}
