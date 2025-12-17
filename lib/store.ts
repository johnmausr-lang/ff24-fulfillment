import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userPhone: string | null;
  setUser: (phone: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userPhone: null,
      setUser: (phone) => set({ userPhone: phone }),
      logout: () => set({ userPhone: null }),
    }),
    { name: 'ff24-user-storage' }
  )
);
