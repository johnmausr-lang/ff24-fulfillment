"use client";

import { create } from "zustand";

export const useCart = create((set, get) => ({
  items: [],

  add: (product) =>
    set({
      items: [...get().items, { ...product, qty: 1 }]
    }),

  remove: (id) =>
    set({
      items: get().items.filter((i) => i.id !== id)
    }),

  clear: () => set({ items: [] }),
}));
