import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import AppSidebar from "../components/layout/AppSidebar";
import { Bell, Moon } from "lucide-react";
import { Button } from "../components/ui/button";
import { useRestaurant } from "../features/restaurants/hooks/useRestaurant";
import Loading from "../components/shared/Loading";
import OnboardingForm from "../features/restaurants/components/OnboardingForm";

export default function DashboardLayout() {
  const { restaurant, isLoading } = useRestaurant();
  console.log(restaurant);
  const location = useLocation();

  if (isLoading) return <Loading />;
  if (!restaurant) return <OnboardingForm />;

  const getPageTitle = () => {
    const path = location.pathname.split("/").filter(Boolean);

    if (path.length === 0) return "Dashboard";

    return path[path.length - 1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <div className="flex flex-1 flex-col">
          {/* top bar */}
          <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold">
                {getPageTitle() + " Page"}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              {/* Theme Toggle */}
              <Button variant="ghost" size="icon">
                <Moon className="h-5 w-5" />
                {/* Swap with Sun when dark mode is active */}
              </Button>
              <div className="flex items-center gap-3 rounded-full border bg-muted/40 px-3 py-1.5">
                {/* Logo */}
                <img
                  src={restaurant.logo_url}
                  alt={restaurant.name}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-background"
                />

                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium text-foreground">
                    {restaurant.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Restaurant
                  </span>
                </div>
              </div>
            </div>
          </header>
          {/* page content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
