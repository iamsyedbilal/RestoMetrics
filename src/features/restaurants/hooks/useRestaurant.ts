import { useUser } from "@clerk/clerk-react";
import {
  getRestaurant,
  createRestaurant,
  uploadRestaurantLogo,
  updateRestaurant,
} from "../api/restaurantApi";
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

  const { mutateAsync: updateRestaurantMutation, isPending: isUpdating } =
    useMutation({
      mutationFn: ({
        restaurantId,
        updates,
      }: {
        restaurantId: string;
        updates: {
          name?: string;
          logo_url?: string;
          currency?: string;
          tax_rate?: number;
        };
      }) => updateRestaurant(restaurantId, updates),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["restaurant", user?.id],
        });
      },
    });

  const { mutateAsync: uploadLogoMutation } = useMutation({
    mutationFn: ({
      restaurantId,
      file,
    }: {
      restaurantId: string;
      file: File;
    }) => uploadRestaurantLogo(restaurantId, file),
  });

  return {
    restaurant,
    isLoading,
    isCreating,
    createRestaurant: createRestaurantMutation,
    updateRestaurant: updateRestaurantMutation,
    uploadLogo: uploadLogoMutation,
    isUpdating,
  };
}
