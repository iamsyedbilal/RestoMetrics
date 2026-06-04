import { Card, CardContent } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";
import type { StatCardProps } from "../../../types/statCardProps";

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-primary",
  variant = "dashboard",
}: StatCardProps) {
  if (variant === "orders") {
    return (
      <Card
        className={cn(
          "border-border/50 bg-card",
          "transition-all duration-300",
          "hover:border-primary/20 hover:shadow-md",
        )}>
        <CardContent className="p-5">
          <div className="space-y-1 flex justify-between items-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {title}
            </p>
            <h3 className="text-4xl font-black tracking-tight text-foreground">
              {value}
            </h3>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "group border-border/60 bg-card",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:shadow-xl hover:shadow-primary/5",
      )}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {title}
            </p>

            <h3 className="mt-3 text-3xl font-bold tracking-tight">{value}</h3>
          </div>

          {Icon && (
            <div className="rounded-2xl bg-muted p-3">
              <Icon className={cn("h-5 w-5", iconColor)} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
