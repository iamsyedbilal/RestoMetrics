import { useOrderStatusDistribution } from "../hooks/useDashboard";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  // Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

interface TooltipProps {
  active?: boolean;
  payload?: { name: string; value: number }[];
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;

  const data = payload[0];

  // clean name safely
  const name = String(data.name).replace(/^:\s*/, "").trim();
  const value = data.value;

  return (
    <div className="rounded-md border border-border bg-card p-2 text-sm shadow-md">
      <p className="font-medium text-card-foreground">
        {name}: {value}
      </p>
    </div>
  );
}

export default function DonutChart() {
  const { data = [], isPending } = useOrderStatusDistribution();

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Order Types</CardTitle>
      </CardHeader>

      <CardContent>
        {isPending ? (
          <div className="h-87.5 animate-pulse rounded-xl bg-muted" />
        ) : (
          <>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={4}
                  stroke="var(--border)">
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>

                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center total */}
            <div className="mt-2 text-center">
              <p className="text-3xl font-bold">{total}</p>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
