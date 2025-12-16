// hooks/useOrderCreation.ts
"use client";

import { create } from "zustand";

// Интерфейс для продукта в заказе
export interface OrderItem {
  id: string; // ID в БД FF24
  msId: string; // ID товара в Мой Склад
  name: string;
  sku: string; // Артикул
  qty: number; // Количество в этом заказе
  stockAvailable: number; // Доступно на складе
}

interface OrderCreationState {
  items: OrderItem[];
  // Добавляем или увеличиваем количество
  addItem: (product: { id: string, msId: string, name: string, sku: string, stockAvailable: number }) => void;
  // Изменяем количество конкретного товара
  updateItemQty: (id: string, qty: number) => void;
  // Удаляем товар из заказа
  removeItem: (id: string) => void;
  // Очищаем заказ
  clearOrder: () => void;
}

export const useOrderCreation = create<OrderCreationState>((set, get) => ({
  items: [],

  addItem: (product) => {
    const { items } = get();
    const existingItem = items.find((i) => i.id === product.id);

    if (existingItem) {
      // Если товар уже есть, увеличиваем количество
      set({
        items: items.map(item =>
          item.id === product.id
            ? { ...item, qty: Math.min(item.qty + 1, item.stockAvailable) }
            : item
        ),
      });
    } else {
      // Если товара нет, добавляем его (с qty=1)
      set({
        items: [
          ...items,
          {
            ...product,
            qty: 1,
            // Добавим проверку, чтобы не превысить доступный остаток
            qty: Math.min(1, product.stockAvailable) 
          }
        ]
      });
    }
  },

  updateItemQty: (id: string, qty: number) => {
    set({
      items: get().items.map((item) => {
        if (item.id === id) {
          // Убедимся, что количество не превышает доступный остаток и не меньше 1
          return { ...item, qty: Math.max(1, Math.min(qty, item.stockAvailable)) };
        }
        return item;
      }),
    });
  },

  removeItem: (id: string) =>
    set({
      items: get().items.filter((i) => i.id !== id)
    }),

  clearOrder: () => set({ items: [] }),
}));
