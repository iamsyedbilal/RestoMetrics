import { useQuery } from "@tanstack/react-query";
import {
  getDashboardMetrics,
  getOrderStatusDistribution,
  getRecentOrders,
  getRevenueByDay,
  getTopSellingItems,
} from "../api/dashboardApi";
import { useRestaurant } from "../../restaurants/hooks/useRestaurant";
import type { RecentOrder } from "../../../types/recentOrderProps";

export function useDashboard() {
  const { restaurant } = useRestaurant();

  return useQuery({
    queryKey: ["dashboardMetrics", restaurant?.id],
    queryFn: () => getDashboardMetrics(restaurant?.id),
    enabled: !!restaurant?.id,
  });
}

export function useRevenueByDay(days: number) {
  const { restaurant } = useRestaurant();

  return useQuery({
    queryKey: ["revenueByDay", restaurant?.id, days],
    queryFn: () => getRevenueByDay(restaurant?.id, days),
    enabled: !!restaurant?.id,
  });
}

export function useOrderStatusDistribution() {
  const { restaurant } = useRestaurant();

  return useQuery({
    queryKey: ["orderStatusDistribution", restaurant?.id],
    queryFn: () => getOrderStatusDistribution(restaurant?.id),
    enabled: !!restaurant?.id,
  });
}

export function useTopSellingItems() {
  const { restaurant } = useRestaurant();

  return useQuery({
    queryKey: ["top-items", restaurant?.id],
    queryFn: () => getTopSellingItems(restaurant?.id),
    enabled: !!restaurant?.id,
  });
}

export function useRecentOrders() {
  const { restaurant } = useRestaurant();

  return useQuery<RecentOrder[]>({
    queryKey: ["dashboard-recent-orders", restaurant?.id],
    queryFn: () =>
      getRecentOrders(restaurant!.id) as unknown as Promise<RecentOrder[]>,
    enabled: !!restaurant?.id,
  });
}
