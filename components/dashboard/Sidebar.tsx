"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/lib/store";
import { 
  LayoutDashboard, 
  PackageSearch, 
  Truck, 
  UserCircle, 
  LogOut, 
  Boxes,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Главная", href: "/dashboard", icon: LayoutDashboard },
  { title: "Инвентаризация", href: "/dashboard/inventory", icon: Boxes },
  { title: "Новая поставка", href: "/dashboard/create-order", icon: PackageSearch },
  { title: "Лента событий", href: "/dashboard/history", icon: ClipboardList },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { userPhone, logout } = useUserStore();

  const handleLogout = async () => {
    try {
      // Сначала чистим куки на сервере
      await fetch("/api/auth/logout", { method: "POST" });
      // Затем чистим стейт
      logout();
      // Уходим на логин
      window.location.href = "/login";
    } catch (err) {
      window.location.href = "/login";
    }
  };

  return (
    <aside className="w-72 bg-[#1A0B2E] border-r border-white/5 flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#D9FF00] rounded-lg rotate-3 flex items-center justify-center">
            <Truck size={18} className="text-black -rotate-3" />
          </div>
          <span className="text-2xl font-black italic uppercase text-white tracking-tighter">
            FF24<span className="text-[#D9FF00]">.</span>LK
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <p className="text-[10px] font-black uppercase text-slate-500 mb-4 ml-4 tracking-[0.2em]">Меню управления</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group relative",
                isActive 
                  ? "bg-[#D9FF00] text-black shadow-[0_0_20px_rgba(217,255,0,0.2)]" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={20} className={cn(isActive ? "text-black" : "text-slate-500 group-hover:text-[#D9FF00]")} />
              <span className="font-black uppercase italic text-sm tracking-wide">{item.title}</span>
              {isActive && (
                <div className="absolute right-4 w-1.5 h-1.5 bg-black rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/5 space-y-4">
        <Link 
          href="/dashboard/profile"
          className={cn(
            "flex items-center gap-3 p-4 rounded-2xl transition-all",
            pathname === "/dashboard/profile" ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5"
          )}
        >
          <div className="w-10 h-10 rounded-xl bg-[#3A1C5F] flex items-center justify-center text-[#D9FF00] border border-white/10">
            <UserCircle size={24} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[10px] font-black uppercase text-slate-500 leading-none mb-1">Клиент</p>
            <p className="text-xs font-bold truncate text-white">{userPhone || "Загрузка..."}</p>
          </div>
        </Link>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-black uppercase italic border border-red-500/10"
        >
          <LogOut size={16} /> Выйти из системы
        </button>
      </div>
    </aside>
  );
}
