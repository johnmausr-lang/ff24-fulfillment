// src/components/providers/global-loader-provider.tsx
'use client';

import { TruckFullscreenLoader } from '@/components/ui/truck-fullscreen-loader';
import { create } from 'zustand';

type LoaderState = {
  isLoading: boolean;
  message: string;
  show: (msg?: string) => void;
  hide: () => void;
};

export const useGlobalLoader = create<LoaderState>((set) => ({
  isLoading: false,
  message: 'Обрабатываем запрос...',
  show: (msg = 'Обрабатываем запрос...') => set({ isLoading: true, message: msg }),
  hide: () => set({ isLoading: false, message: '' }),
}));

export function GlobalLoaderProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, message } = useGlobalLoader();

  return (
    <>
      {children}
      <TruckFullscreenLoader isLoading={isLoading} message={message} />
    </>
  );
}
