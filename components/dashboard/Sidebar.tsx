"use client";

import Link from "next/link";
import { Package, BarChart3, Truck, User, Boxes } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#0F0F0F] border-r border-white/5 backdrop-blur-xl p-8 flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <Image
          src="/logo-ff24.png"
          width={42}
          height={42}
          alt="FF24"
          className="drop-shadow-lg"
        />
        <span className="text-xl font-semibold">FF24 Dashboard</span>
      </div>

      <nav className="flex flex-col gap-4 text-white/70">
        <Link className="hover:text-white flex items-center gap-3" href="/dashboard">
          <BarChart3 className="w-5" /> Аналитика
        </Link>

        <Link className="hover:text-white flex items-center gap-3" href="/dashboard/orders">
          <Package className="w-5" /> Заказы
        </Link>

        <Link className="hover:text-white flex items-center gap-3" href="/dashboard/stock">
          <Boxes className="w-5" /> Остатки
        </Link>

        <Link className="hover:text-white flex items-center gap-3" href="/dashboard/supply/new">
          <Truck className="w-5" /> Новая поставка
        </Link>

        <Link className="hover:text-white flex items-center gap-3" href="/dashboard/profile">
          <User className="w-5" /> Профиль
        </Link>
      </nav>
    </aside>
  );
}
