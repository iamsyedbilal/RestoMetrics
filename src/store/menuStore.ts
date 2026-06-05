import { create } from "zustand";

export type MenuCategory = string | "all";

type MenuStore = {
  category: MenuCategory;
  setCategory: (category: MenuCategory) => void;
};

export const useMenuStore = create<MenuStore>((set) => ({
  category: "all",

  setCategory: (category) => set({ category }),
}));
