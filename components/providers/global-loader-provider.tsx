"use client";

import { createContext, useContext, useState } from "react";
import TruckLoader from "@/components/ui/TruckLoader";

type LoaderContextType = {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

const LoaderContext = createContext<LoaderContextType | null>(null);

export const useGlobalLoader = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error("useGlobalLoader must be used inside GlobalLoaderProvider");
  return ctx;
};

export default function GlobalLoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  const value = {
    loading,
    showLoader: () => setLoading(true),
    hideLoader: () => setLoading(false),
  };

  return (
    <LoaderContext.Provider value={value}>
      {children}
      {loading && <TruckLoader />}
    </LoaderContext.Provider>
  );
}
