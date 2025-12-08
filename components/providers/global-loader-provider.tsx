// components/providers/global-loader-provider.tsx
"use client";

import { TruckFullscreenLoader } from "@/components/ui/truck-fullscreen-loader";
import { create } from "zustand";

// Zustand store
type LoaderState = {
  isLoading: boolean;
  message: string;
  show: (msg?: string) => void;
  hide: () => void;
};

export const useGlobalLoader = create<LoaderState>((set) => ({
  isLoading: false,
  message: "Обрабатываем ваш запрос...",
  show: (msg = "Обрабатываем ваш запрос...") => set({ isLoading: true, message: msg }),
  hide: () => set({ isLoading: false }),
}));

// Компонент-провайдер — default export
export default function GlobalLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, message } = useGlobalLoader();

  return (
    <>
      {children}
      <TruckFullscreenLoader isLoading={isLoading} message={message} />
    </>
  );
}
