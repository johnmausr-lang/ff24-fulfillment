// components/dashboard/Sidebar.tsx

import Link from "next/link";
import { BarChart3, Boxes, LogOut, Home } from "lucide-react";

export default function Sidebar() {
  const menu = [
    { label: "Главная", href: "/dashboard", icon: <Home size={18} /> },
    { label: "Заказы", href: "/dashboard/orders", icon: <BarChart3 size={18} /> },
    { label: "Остатки", href: "/dashboard/stock", icon: <Boxes size={18} /> },
  ];

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">МойСклад ЛК</h2>

      <nav className="flex flex-col gap-2 flex-1">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-2 px-3 py-2 rounded bg-red-50 text-red-600 mt-4 hover:bg-red-100"
      >
        <LogOut size={18} /> Выйти
      </button>
    </aside>
  );
}
