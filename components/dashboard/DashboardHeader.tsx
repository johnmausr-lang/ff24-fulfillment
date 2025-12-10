"use client";

import Image from "next/image";

export default function DashboardHeader() {
  return (
    <header
      className="
        sticky top-0 z-30
        backdrop-blur-2xl bg-black/30 border-b border-white/10
        px-8 py-4 flex justify-between items-center
      "
    >
      <div>
        <h2 className="text-lg font-semibold">Личный кабинет FF24</h2>
        <p className="text-white/50 text-sm">Управление заказами и складом</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-white/70 text-sm">Вы авторизованы</span>
        <Image
          src="/illustrations/worker-ff24.png"
          alt="User"
          width={36}
          height={36}
          className="rounded-full border border-white/20"
        />
      </div>
    </header>
  );
}
