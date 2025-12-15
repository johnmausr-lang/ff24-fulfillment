"use client";

import { create } from "zustand";
import { ReactNode } from "react";

/* =========================
   STORE
========================= */

type LoaderState = {
  loading: boolean;
  show: () => void;
  hide: () => void;
};

export const useGlobalLoader = create<LoaderState>((set) => ({
  loading: false,
  show: () => set({ loading: true }),
  hide: () => set({ loading: false }),
}));

/* =========================
   PROVIDER
========================= */

export default function GlobalLoaderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const loading = useGlobalLoader((s) => s.loading);

  return (
    <>
      {children}
      {loading && <FullscreenLoader />}
    </>
  );
}

/* =========================
   FULLSCREEN LOADER
========================= */

function FullscreenLoader() {
  return (
    <div
      className="
        fixed inset-0 z-[9999]
        bg-black/80 backdrop-blur-xl
        flex items-center justify-center
      "
    >
      <div className="flex flex-col items-center gap-6">
        {/* BOXES */}
        <div className="flex gap-3">
          <div className="loader-box lb1" />
          <div className="loader-box lb2" />
          <div className="loader-box lb3" />
        </div>

        <div className="text-sm tracking-widest text-[#FFEB3B] opacity-80">
          FF24 · PROCESSING
        </div>
      </div>

      <style jsx>{`
        .loader-box {
          width: 22px;
          height: 22px;
          background: linear-gradient(135deg, #ffeb3b, #ffe066);
          border-radius: 4px;
          animation: pulse 1.2s infinite ease-in-out;
        }

        .lb2 {
          animation-delay: 0.15s;
        }
        .lb3 {
          animation-delay: 0.3s;
        }

        @keyframes pulse {
          0% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
