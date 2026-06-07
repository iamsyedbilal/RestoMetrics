import { useFormatCurrency } from "../../../hooks/useCurrency";
import { useTopSellingItems } from "../hooks/useDashboard";

export default function TopSellingItems() {
  const { data = [] } = useTopSellingItems();
  const currency = useFormatCurrency();

  const max = Math.max(...data.map((i) => i.totalOrders), 1);
  return (
    <div className="rounded-xl border bg-card p-4">
      <h2 className="mb-4 text-lg font-semibold">Top Selling Items</h2>

      <div className="space-y-4">
        {data.map((item, index) => {
          const progress = (item.totalOrders / max) * 100;

          return (
            <div key={item.name} className="space-y-1">
              {/* Header Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    #{index + 1}
                  </span>

                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold">{item.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">
                    {currency(item.totalRevenue)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
