// app/dashboard/DashboardWrapper.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("ff24_theme") as "light" | "dark" | null;
    const newTheme = saved || "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("ff24_theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const navItems = [
    { href: "/dashboard", label: "Главная" },
    { href: "/dashboard/orders", label: "Заказы" },
    { href: "/dashboard/orders/new", label: "Новый заказ" },
    { href: "/dashboard/stock", label: "Склад" },
    { href: "/dashboard/profile", label: "Профиль" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      {/* Сайдбар */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-purple-600">FF24</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Фулфилмент</p>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-xl transition-all font-medium ${
                pathname === item.href
                  ? "bg-purple-600 text-white shadow-lg"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={toggleTheme}
          className="mt-auto flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          <span>{theme === "dark" ? "Светлая" : "Тёмная"}</span>
        </button>
      </aside>

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
