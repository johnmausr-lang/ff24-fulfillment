"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function WarehouseGate({ onFinish }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
      setTimeout(onFinish, 1500);
    }, 600);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0F0F0F] z-50 overflow-hidden">
      {/* Левая створка */}
      <div
        className={`
          absolute top-0 left-0 h-full w-1/2
          bg-[url('/illustrations/gate-left.png')] bg-cover bg-center
          transition-transform duration-[1500ms] ease-out
          ${open ? "-translate-x-full" : "translate-x-0"}
        `}
      ></div>

      {/* Правая створка */}
      <div
        className={`
          absolute top-0 right-0 h-full w-1/2
          bg-[url('/illustrations/gate-right.png')] bg-cover bg-center
          transition-transform duration-[1500ms] ease-out
          ${open ? "translate-x-full" : "translate-x-0"}
        `}
      ></div>

      {/* 3D-грузчик поверх */}
      <Image
        src="/illustrations/worker-ff24.png"
        alt="Worker"
        width={380}
        height={380}
        className={`
          absolute bottom-10 left-1/2 -translate-x-1/2
          opacity-0 transition-opacity duration-[1200ms]
          ${open ? "opacity-100" : ""}
        `}
      />
    </div>
  );
}
