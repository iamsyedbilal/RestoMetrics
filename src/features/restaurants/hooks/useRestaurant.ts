import { useUser } from "@clerk/clerk-react";
import { getRestaurant, createRestaurant } from "../api/restaurantApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useRestaurant() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { data: restaurant, isPending: isLoading } = useQuery({
    queryKey: ["restaurant", user?.id],
    queryFn: () => getRestaurant(user!.id),
    enabled: !!user?.id,
  });

  const { mutateAsync: createRestaurantMutation, isPending: isCreating } =
    useMutation({
      mutationFn: (name: string) => createRestaurant(user!.id, name),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["restaurant", user?.id] });
      },
      onError: (error) => {
        console.error("Error creating restaurant:", error);
      },
    });

  return {
    restaurant,
    isLoading,
    isCreating,
    createRestaurant: createRestaurantMutation,
  };
}
