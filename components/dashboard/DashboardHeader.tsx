"use client";

export default function DashboardHeader() {
  return (
    <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 p-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Личный кабинет FF24
      </h1>
      <p className="text-white/60 mt-1 text-sm">
        Добро пожаловать! Здесь находится аналитика, остатки и управление поставками.
      </p>
    </div>
  );
}
