import { Card, CardContent } from "../../../components/ui/card";
import type { StatCardProps } from "../../../types/statCardProps";

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-chart-4",
  iconBg = "bg-muted",
  accentColor = "bg-chart-4",
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden border shadow-sm transition-all duration-200 hover:shadow-md">
      <div className={`absolute top-0 left-0 h-1 w-full ${accentColor}`} />

      <CardContent className="flex items-center justify-between px-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <h3 className="mt-1 text-2xl font-bold tracking-tight text-card-foreground">
            {value}
          </h3>
        </div>

        <div
          className={`${iconBg} flex h-12 w-12 shrink-0 items-center justify-center rounded-xl`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </CardContent>
    </Card>
  );
}
