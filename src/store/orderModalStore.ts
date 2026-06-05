import { create } from "zustand";

type Store = {
  orderId: string | null;
  open: boolean;
  setOrder: (id: string) => void;
  close: () => void;
};

export const useOrderModalStore = create<Store>((set) => ({
  orderId: null,
  open: false,

  setOrder: (id) =>
    set({
      orderId: id,
      open: true,
    }),

  close: () =>
    set({
      open: false,
      orderId: null,
    }),
}));
