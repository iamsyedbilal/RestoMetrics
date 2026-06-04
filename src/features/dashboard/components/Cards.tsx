import { TrendingUp, ShoppingBag, BarChart2, Users } from "lucide-react";
import StatCard from "./StatCard";
import { useDashboard } from "../hooks/useDashboard";
import { formatCurrency } from "../../../lib/formatCurrency";
import SkeletonLoading from "../../../components/shared/SkeletonLoading";

export default function Cards() {
  const { data, isPending } = useDashboard();

  if (isPending) return <SkeletonLoading />;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Revenue"
        value={formatCurrency(data?.totalRevenue ?? 0)}
        icon={TrendingUp}
        iconColor="text-chart-4"
      />

      <StatCard
        title="Total Orders"
        value={String(data?.totalOrders ?? 0)}
        icon={ShoppingBag}
        iconColor="text-chart-2"
      />

      <StatCard
        title="Avg Order Value"
        value={formatCurrency(data?.avgOrderValue ?? 0)}
        icon={BarChart2}
        iconColor="text-chart-1"
      />

      <StatCard
        title="Total Customers"
        value={String(data?.totalCustomers ?? 0)}
        icon={Users}
        iconColor="text-primary"
      />
    </div>
  );
}
