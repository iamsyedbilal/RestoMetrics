import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  Users,
  Settings,
} from "lucide-react";

export const mainNavigation = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Menu", url: "/menu", icon: UtensilsCrossed },
  { title: "Customers", url: "/customers", icon: Users },
];

export const systemNavigation = [
  { title: "Settings", url: "/settings", icon: Settings },
];
