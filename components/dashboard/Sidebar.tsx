"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, BarChart3, Truck, User, Boxes } from "lucide-react";
import Image from "next/image";

const menu = [
  { href: "/dashboard", label: "Аналитика", icon: BarChart3 },
  { href: "/dashboard/orders", label: "Заказы", icon: Package },
  { href: "/dashboard/stock", label: "Остатки", icon: Boxes },
  { href: "/dashboard/supply/new", label: "Поставка", icon: Truck },
  { href: "/dashboard/profile", label: "Профиль", icon: User },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="
        w-72 p-8 bg-[#0F0F0F]
        border-r border-white/10
        backdrop-blur-2xl
        shadow-[inset_0_0_30px_rgba(255,107,0,0.06)]
    ">
      {/* Лого */}
      <div className="flex items-center gap-4 mb-10">
        <Image
          src="/logo-ff24.png"
          width={42}
          height={42}
          alt="FF24"
          className="drop-shadow-[0_0_12px_rgba(255,107,0,0.5)]"
        />
        <span className="text-xl font-semibold text-white tracking-wide">
          FF24 Dashboard
        </span>
      </div>

      <nav className="flex flex-col gap-4">
        {menu.map((item, i) => {
          const Icon = item.icon;
          const active = path === item.href;

          return (
            <Link
              key={i}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-300

                ${
                  active
                    ? "bg-gradient-to-r from-[#FF6B00] to-[#FF8C32] text-black font-semibold shadow-[0_0_20px_rgba(255,107,0,0.5)]"
                    : "text-white/60 hover:text-white hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.06)]"
                }

                hover:translate-x-1
                hover:shadow-lg
              `}
            >
              <Icon className={`w-5 ${active ? "text-black" : "text-white/40"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
