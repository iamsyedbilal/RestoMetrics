import { getOrderMetrics, getOrders, getSingleOrder } from "../api/orderApi";
import { useQuery } from "@tanstack/react-query";
import { useRestaurant } from "../../restaurants/hooks/useRestaurant";
import { useOrdersStore } from "../../../store/orderStore";
import { useDebounce } from "../../../hooks/useDebounce";

export function useOrderMetrics() {
  const { restaurant } = useRestaurant();

  return useQuery({
    queryKey: ["orderMetrics", restaurant?.id],
    queryFn: () => getOrderMetrics(restaurant?.id),
    enabled: !!restaurant?.id,
  });
}

export function useOrders() {
  const { restaurant } = useRestaurant();
  const { status, search, page, limit } = useOrdersStore();

  const debouncedSearch = useDebounce(search, 300);

  return useQuery({
    queryKey: ["orders", restaurant?.id, status, debouncedSearch, page],
    queryFn: () =>
      getOrders(restaurant!.id, status, debouncedSearch, page, limit),
    enabled: !!restaurant?.id,
  });
}

export function useSingleOrder(orderId?: string) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getSingleOrder(orderId!),
    enabled: !!orderId,
  });
}
