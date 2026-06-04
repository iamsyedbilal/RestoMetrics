import type { LucideIcon } from "lucide-react";

export type StatCardProps = {
  title: string;
  value: string;
  icon?: LucideIcon;
  iconColor?: string;
  variant?: "dashboard" | "orders";
};
