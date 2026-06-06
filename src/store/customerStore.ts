import { create } from "zustand";

type CustomersStore = {
  search: string;
  setSearch: (search: string) => void;
};

export const useCustomersStore = create<CustomersStore>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));
