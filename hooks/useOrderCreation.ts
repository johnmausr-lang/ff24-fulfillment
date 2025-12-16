// hooks/useOrderCreation.ts

"use client";

import { create } from 'zustand';

// 1. Определение базовых типов (ИСПРАВЛЕНО: ДОБАВЛЕН 'export')
export interface CartItem { 
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// 2. Определение состояния (Теперь включает totalItems и totalPrice)
interface OrderCreationState {
  items: CartItem[];
  totalItems: number; 
  totalPrice: number; 

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// 3. Вспомогательная функция для вычисления итоговых значений
const getTotals = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { totalItems, totalPrice };
}

// 4. Определение хука Zustand
export const useOrderCreation = create<OrderCreationState>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addItem: (item) => set(state => {
    const existingItem = state.items.find(i => i.id === item.id);
    let newItems;

    if (existingItem) {
      // Если товар уже есть, увеличиваем количество
      newItems = state.items.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    } else {
      // Иначе добавляем новый товар
      newItems = [...state.items, item];
    }
    
    // Обновляем общие значения
    const { totalItems, totalPrice } = getTotals(newItems);
    
    return { items: newItems, totalItems, totalPrice };
  }),

  removeItem: (id) => set(state => {
    const newItems = state.items.filter(i => i.id !== id);
    const { totalItems, totalPrice } = getTotals(newItems);
    return { items: newItems, totalItems, totalPrice };
  }),

  updateQuantity: (id, quantity) => set(state => {
    // Убедимся, что количество не меньше 1
    const safeQuantity = Math.max(1, quantity); 
    
    const newItems = state.items.map(i => 
      i.id === id ? { ...i, quantity: safeQuantity } : i
    );
    const { totalItems, totalPrice } = getTotals(newItems);
    return { items: newItems, totalItems, totalPrice };
  }),

  clearCart: () => set(() => ({ items: [], totalItems: 0, totalPrice: 0 })),
}));
