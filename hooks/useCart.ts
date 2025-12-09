"use client";

import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  qty: number;
  salePrices?: { value: number }[];
  meta: any;
}

interface CartState {
  items: CartItem[];
  add: (product: any) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],

  add: (product: any) =>
    set({
      items: [
        ...get().items,
        {
          id: product.id,
          name: product.name,
          qty: 1,
          salePrices: product.salePrices,
          meta: product.meta,
        }
      ]
    }),

  remove: (id: string) =>
    set({
      items: get().items.filter((i) => i.id !== id)
    }),

  clear: () => set({ items: [] }),
}));
