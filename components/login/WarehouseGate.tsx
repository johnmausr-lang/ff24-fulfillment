"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface WarehouseGateProps {
  onFinish: () => void; // ← типизируем проп
}

export default function WarehouseGate({ onFinish }: WarehouseGateProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setOpen(true);

      // выезд ворот 2 секунды → запуск LoginPage
      setTimeout(() => {
        onFinish();
      }, 2000);
    }, 800);

    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div
      className="
        fixed inset-0 bg-[#0F0F0F]
        flex items-center justify-center
        overflow-hidden z-50
      "
    >
      {/* Левая створка */}
      <div
        className={`
          absolute left-0 top-0 h-full w-1/2 bg-[#1A1A1A]
          transition-transform duration-[2000ms]
          ${open ? "-translate-x-full" : "translate-x-0"}
        `}
      />

      {/* Правая створка */}
      <div
        className={`
          absolute right-0 top-0 h-full w-1/2 bg-[#1A1A1A]
          transition-transform duration-[2000ms]
          ${open ? "translate-x-full" : "translate-x-0"}
        `}
      />

      {/* FF24 логотип */}
      <Image
        src="/logo/ff24-main.svg"
        alt="FF24"
        width={180}
        height={180}
        className={`transition-all duration-1000 ${
          open ? "opacity-0 scale-75" : "opacity-100 scale-100"
        }`}
      />
    </div>
  );
}
