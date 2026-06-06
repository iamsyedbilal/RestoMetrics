import { getAllTheCustomers } from "../api/customersApi";
import { useQuery } from "@tanstack/react-query";
import { useRestaurant } from "../../restaurants/hooks/useRestaurant";
import { useDebounce } from "../../../hooks/useDebounce";
import { useCustomersStore } from "../../../store/customerStore";

export function useCustomers() {
  const { restaurant } = useRestaurant();
  const { search } = useCustomersStore();

  const debouncedSearch = useDebounce(search, 300);

  return useQuery({
    queryKey: ["customers", restaurant?.id, debouncedSearch],
    queryFn: () => getAllTheCustomers(restaurant?.id, debouncedSearch),
    enabled: !!restaurant?.id,
  });
}
