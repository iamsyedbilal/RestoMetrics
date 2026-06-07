import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import AppSidebar from "../components/layout/AppSidebar";
import { Bell, Moon, Sun } from "lucide-react";
import { Button } from "../components/ui/button";
import { useRestaurant } from "../features/restaurants/hooks/useRestaurant";
import Loading from "../components/shared/Loading";
import OnboardingForm from "../features/restaurants/components/OnboardingForm";
import { useThemeStore } from "../store/themeStore";

// ← outside the component
function ThemeIcon({ theme }: { theme: string }) {
  if (theme === "dark") return <Moon className="h-5 w-5" />;
  return <Sun className="h-5 w-5" />;
}

export default function DashboardLayout() {
  const { restaurant, isLoading } = useRestaurant();
  const { theme, setTheme } = useThemeStore();
  const location = useLocation();

  if (isLoading) return <Loading />;
  if (!restaurant) return <OnboardingForm />;

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

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
          <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold">
                {getPageTitle() + " Page"}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                <ThemeIcon theme={theme} />
              </Button>

              <div className="flex items-center gap-3 rounded-full border bg-muted/40 px-3 py-1.5">
                {restaurant.logo_url ? (
                  <img
                    src={restaurant.logo_url}
                    alt={restaurant.name}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-background"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {restaurant.name?.[0]}
                  </div>
                )}
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium">{restaurant.name}</span>
                  <span className="text-xs text-muted-foreground">
                    Restaurant
                  </span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
