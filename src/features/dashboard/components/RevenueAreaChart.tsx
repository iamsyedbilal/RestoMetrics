import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import { useRevenueByDay } from "../hooks/useDashboard";

export default function RevenueAreaChart() {
  const [days, setDays] = useState(30);

  const { data = [], isPending } = useRevenueByDay(days);

  return (
    <Card className="mt-3 bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Revenue Overview</CardTitle>

        <Select
          value={String(days)}
          onValueChange={(value) => setDays(Number(value))}>
          <SelectTrigger className="w-35">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="7">Last 7 Days</SelectItem>
            <SelectItem value="15">Last 15 Days</SelectItem>
            <SelectItem value="30">Last 30 Days</SelectItem>
            <SelectItem value="60">Last 60 Days</SelectItem>
            <SelectItem value="90">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {isPending ? (
          <div className="h-87.5 animate-pulse rounded-xl bg-muted" />
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-4)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-4)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                minTickGap={20}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickFormatter={(value) =>
                  `PKR ${Number(value).toLocaleString()}`
                }
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  color: "var(--card-foreground)",
                }}
                formatter={(value) => [
                  `PKR ${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--chart-4)"
                fill="url(#revenueGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
