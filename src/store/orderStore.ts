import { create } from "zustand";

export type OrderStatus =
  | "all"
  | "pending"
  | "preparing"
  | "delivered"
  | "cancelled";

export type OrderViewMode = "list" | "grid";

type OrdersStore = {
  status: OrderStatus;
  search: string;
  page: number;
  limit: number;
  viewMode: OrderViewMode;
  setStatus: (status: OrderStatus) => void;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setViewMode: (mode: OrderViewMode) => void;
};

export const useOrdersStore = create<OrdersStore>((set) => ({
  status: "all",
  search: "",
  page: 1,
  limit: 20,
  viewMode: "list",
  setSearch: (search) => set({ search, page: 1 }),
  setStatus: (status) => set({ status, page: 1 }),
  setPage: (page) => set({ page }),
  setViewMode: (viewMode) => set({ viewMode }),
}));
