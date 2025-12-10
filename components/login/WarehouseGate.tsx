"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export interface WarehouseGateProps {
  onFinish?: () => void;
  openMode?: boolean; // ← добавили поддержку режима открытия
}

export default function WarehouseGate({
  onFinish,
  openMode = false,
}: WarehouseGateProps) {
  const [opened, setOpened] = useState(openMode);

  useEffect(() => {
    // Если openMode включён — сразу открываем ворота
    if (openMode) {
      setOpened(true);
      setTimeout(() => onFinish && onFinish(), 1000);
      return;
    }

    // Иначе — закрытые ворота → через 1.2 сек открываем
    const timer = setTimeout(() => {
      setOpened(true);
      setTimeout(() => onFinish && onFinish(), 800);
    }, 1200);

    return () => clearTimeout(timer);
  }, [openMode, onFinish]);

  return (
    <div className="fixed inset-0 bg-[#0F0F0F] flex items-center justify-center z-50 overflow-hidden">
      {/* Левое крыло ворот */}
      <div
        className={`
          absolute left-0 top-0 h-full w-1/2 bg-[#1A1A1A]
          transition-transform duration-1000
          ${opened ? "-translate-x-full" : "translate-x-0"}
        `}
      />

      {/* Правое крыло ворот */}
      <div
        className={`
          absolute right-0 top-0 h-full w-1/2 bg-[#1A1A1A]
          transition-transform duration-1000
          ${opened ? "translate-x-full" : "translate-x-0"}
        `}
      />

      {/* Логотип или контент */}
      <Image
        src="/illustrations/worker-ff24.png"
        alt="Warehouse Loader"
        width={300}
        height={300}
        className="relative z-10 animate-fadeIn"
      />
    </div>
  );
}
