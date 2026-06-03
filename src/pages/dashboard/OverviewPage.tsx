import Cards from "../../features/dashboard/components/Cards";
import DonutChart from "../../features/dashboard/components/DonutChart";
import RecentOrders from "../../features/dashboard/components/RecentOrders";
import RevenueAreaChart from "../../features/dashboard/components/RevenueAreaChart";
import TopSellingItems from "../../features/dashboard/components/TopSellingItems";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* KPI ROW */}
      <Cards />

      {/* CHARTS ROW */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueAreaChart />
        </div>

        <div>
          <DonutChart />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <TopSellingItems />
        </div>
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}
