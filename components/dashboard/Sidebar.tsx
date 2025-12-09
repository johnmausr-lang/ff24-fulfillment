"use client";

import Link from "next/link";
import { LayoutDashboard, Package, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-screen p-6 flex flex-col gap-6">
      
      <div className="text-2xl font-black text-[#21004B]">FF24</div>

      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="flex items-center gap-3 text-lg">
          <LayoutDashboard size={20} /> Главная
        </Link>

        <Link href="/dashboard/supply/new" className="flex items-center gap-3 text-lg">
          <Package size={20} /> Новая поставка
        </Link>
      </nav>

      <div className="mt-auto">
        <button
          onClick={() => {
            document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 text-red-600"
        >
          <LogOut size={20} /> Выйти
        </button>
      </div>
    </aside>
  );
}
