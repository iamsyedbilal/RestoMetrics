import { TrendingUp, ShoppingBag, BarChart2, Users } from "lucide-react";
import StatCard from "./StatCard";
import { useDashboard } from "../hooks/useDashboard";
import { formatCurrency } from "../../../lib/formatCurrency";

export default function Cards() {
  const { data, isPending } = useDashboard();

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-xl border bg-muted"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Revenue"
        value={formatCurrency(data?.totalRevenue ?? 0)}
        icon={TrendingUp}
        iconColor="text-chart-4"
        iconBg="bg-muted"
        accentColor="bg-chart-4"
      />

      <StatCard
        title="Total Orders"
        value={String(data?.totalOrders ?? 0)}
        icon={ShoppingBag}
        iconColor="text-chart-2"
        iconBg="bg-muted"
        accentColor="bg-chart-2"
      />

      <StatCard
        title="Avg Order Value"
        value={formatCurrency(data?.avgOrderValue ?? 0)}
        icon={BarChart2}
        iconColor="text-chart-1"
        iconBg="bg-muted"
        accentColor="bg-chart-1"
      />

      <StatCard
        title="Total Customers"
        value={String(data?.totalCustomers ?? 0)}
        icon={Users}
        iconColor="text-primary"
        iconBg="bg-muted"
        accentColor="bg-primary"
      />
    </div>
  );
}
