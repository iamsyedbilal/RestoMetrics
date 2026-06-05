import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRestaurant } from "../../restaurants/hooks/useRestaurant";
import {
  getAllMenus,
  createMenu,
  deleteMenuItem,
  getMenuCategories,
  updateMenu,
} from "../api/menuApi";
import type { MenuType } from "../../../types/menuType";
import { toast } from "sonner";
import { useMenuStore } from "../../../store/menuStore";

export function useGetAllMenu() {
  const { restaurant } = useRestaurant();
  const { category } = useMenuStore();

  return useQuery({
    queryKey: ["menu", restaurant?.id, category],
    queryFn: () => getAllMenus(restaurant!.id, category),
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

export function useMenuCategories() {
  const { restaurant } = useRestaurant();

  return useQuery({
    queryKey: ["menu-categories", restaurant?.id],
    queryFn: () => getMenuCategories(restaurant!.id),
    enabled: !!restaurant?.id,
  });
}

export function useUpdateMenu() {
  const { restaurant } = useRestaurant();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      menuId,
      menuData,
      imageFile,
    }: {
      menuId: string;
      menuData: Partial<MenuType>;
      imageFile?: File;
    }) => updateMenu(menuId, menuData, imageFile, restaurant?.id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menu", restaurant?.id],
      });

      toast.success("Menu updated");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
