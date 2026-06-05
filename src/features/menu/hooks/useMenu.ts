import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRestaurant } from "../../restaurants/hooks/useRestaurant";
import { getAllMenus, createMenu, deleteMenuItem } from "../api/menuApi";
import type { MenuType } from "../../../types/menuType";
import { toast } from "sonner";

export function useGetAllMenu() {
  const { restaurant } = useRestaurant();

  return useQuery({
    queryKey: ["menu", restaurant?.id],
    queryFn: () => getAllMenus(restaurant?.id),
    enabled: !!restaurant?.id,
  });
}

export function useCreateMenu() {
  const { restaurant } = useRestaurant();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      menuData,
      imageFile,
    }: {
      menuData: MenuType;
      imageFile?: File;
    }) => createMenu(restaurant!.id, menuData, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menu", restaurant?.id],
      });
      toast.success("Menu Created");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteMenu() {
  const { restaurant } = useRestaurant();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (menuId: string) => deleteMenuItem(menuId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menu", restaurant?.id],
      });
      toast.success("Menu item deleted");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
