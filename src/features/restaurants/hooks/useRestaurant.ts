// src/features/restaurants/hooks/useRestaurant.ts
import { useUser } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getRestaurant,
  createRestaurant,
  uploadRestaurantLogo,
  updateRestaurant,
} from "../api/restaurantApi";

// ─── Get Restaurant ───────────────────────────────────────
export function useRestaurant() {
  const { user } = useUser();

  const { data: restaurant, isPending: isLoading } = useQuery({
    queryKey: ["restaurant", user?.id],
    queryFn: () => getRestaurant(user!.id),
    enabled: !!user?.id,
  });

  return { restaurant, isLoading };
}

// ─── Create Restaurant ────────────────────────────────────
export function useCreateRestaurant() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createRestaurant(user!.id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant", user?.id] });
    },
    onError: (error) => {
      console.error("Error creating restaurant:", error);
    },
  });
}

// ─── Update Restaurant ────────────────────────────────────
export function useUpdateRestaurant() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
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

    onSuccess: (data) => {
      queryClient.setQueryData(["restaurant", user?.id], data);
    },

    onError: (error) => {
      console.error("Update error:", error);
    },
  });
}

// ─── Upload Logo ──────────────────────────────────────────
export function useUploadLogo() {
  return useMutation({
    mutationFn: ({
      restaurantId,
      file,
    }: {
      restaurantId: string;
      file: File;
    }) => uploadRestaurantLogo(restaurantId, file),
  });
}
