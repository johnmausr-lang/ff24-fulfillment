"use client";

export default function DashboardHeader() {
  return (
    <header
      className="
        sticky top-0 z-30
        backdrop-blur-2xl
        bg-white/5
        border-b border-white/10
        px-10 py-6
        shadow-[0_4px_30px_rgba(0,0,0,0.35)]
      "
    >
      <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-[0_0_12px_rgba(255,107,0,0.25)]">
        Личный кабинет FF24
      </h1>
      <p className="text-white/60 mt-1 text-sm">
        Управление логистикой, поставками, товарами и аналитикой.
      </p>
    </header>
  );
}
