"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export interface WarehouseGateProps {
  onFinish?: () => void;
  openMode?: boolean;
}

export default function WarehouseGate({
  onFinish,
  openMode = false,
}: WarehouseGateProps) {
  const [opened, setOpened] = useState(openMode);

  useEffect(() => {
    if (openMode) {
      setOpened(true);
      setTimeout(() => onFinish?.(), 900);
      return;
    }

    const t = setTimeout(() => {
      setOpened(true);
      setTimeout(() => onFinish?.(), 900);
    }, 900);

    return () => clearTimeout(t);
  }, [openMode, onFinish]);

  return (
    <div className="fixed inset-0 bg-[#0F0F0F] flex items-center justify-center z-50 overflow-hidden">
      {/* Left wing */}
      <div
        className={`
          absolute left-0 top-0 h-full w-1/2 bg-[#1A1A1A]
          transition-transform duration-1000
          ${opened ? "-translate-x-full" : "translate-x-0"}
        `}
      />

      {/* Right wing */}
      <div
        className={`
          absolute right-0 top-0 h-full w-1/2 bg-[#1A1A1A]
          transition-transform duration-1000
          ${opened ? "translate-x-full" : "translate-x-0"}
        `}
      />

      {/* Loader character */}
      <Image
        src="/illustrations/worker-ff24.png"
        alt="Warehouse Worker"
        width={320}
        height={320}
        className="relative z-10 animate-fadeIn"
      />
    </div>
  );
}
