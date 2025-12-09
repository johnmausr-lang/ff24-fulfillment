// app/dashboard/DashboardSidebar.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, PlusCircle, User, Boxes } from "lucide-react";

export default function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (!isDashboard) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Сайдбар */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-purple-600">FF24</h1>
          <p className="text-sm text-gray-500">Фулфилмент</p>
        </div>
        <nav className="space-y-2">
          {[
            { href: "/dashboard", label: "Главная", icon: LayoutDashboard },
            { href: "/dashboard/orders", label: "Заказы", icon: Package },
            { href: "/dashboard/orders/new", label: "Новый заказ", icon: PlusCircle },
            { href: "/dashboard/stock", label: "Склад", icon: Boxes },
            { href: "/dashboard/profile", label: "Профиль", icon: User },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-purple-600 text-white"
                  : "hover:bg-purple-100 text-gray-700"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Основной контент */}
      <main className="flex-1 p-8 bg-gradient-to-br from-purple-50 to-orange-50">
        {children}
      </main>
    </div>
  );
}
