// app/layout.tsx
"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./dashboard/dashboard.css"; // Твои стили дашборда

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import GlobalLoaderProvider from "@/components/providers/global-loader-provider";
import { TruckFullscreenLoader } from "@/components/ui/truck-fullscreen-loader";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, PlusCircle, User, Boxes, LogOut, Sun, Moon } from "lucide-react";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "FF24 Fulfillment — Личный кабинет",
  description: "Фулфилмент для Wildberries, Ozon, Яндекс Маркет и МойСклад",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

  const menu = [
    { href: "/dashboard", label: "Главная", icon: <LayoutDashboard size={20} /> },
    { href: "/dashboard/orders", label: "Заказы", icon: <Package size={20} /> },
    { href: "/dashboard/orders/new", label: "Новый заказ", icon: <PlusCircle size={20} /> },
    { href: "/dashboard/stock", label: "Склад", icon: <Boxes size={20} /> },
    { href: "/dashboard/profile", label: "Профиль", icon: <User size={20} /> },
  ];

  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlobalLoaderProvider>
            {/* Глобальный лоадер — твой грузовик */}
            <TruckFullscreenLoader isLoading={false} message="Работаем для вас..." />

            {isDashboardRoute ? (
              // ДАШБОРД С САЙДБАРОМ
              <div className="flex min-h-screen">
                {/* Сайдбар */}
                <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col">
                  <div className="mb-10">
                    <h1 className="text-3xl font-bold text-red-600">FF24</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Фулфилмент</p>
                  </div>

                  <nav className="space-y-2 flex-1">
                    {menu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          pathname === item.href
                            ? "bg-red-600 text-white shadow-lg"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </nav>

                  {/* Переключатель темы */}
                  <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                      <span>{theme === "dark" ? "Светлая тема" : "Тёмная тема"}</span>
                    </button>
                  </div>
                </aside>

                {/* Контент */}
                <main className="flex-1 p-8">
                  <div className="max-w-7xl mx-auto">{children}</div>
                </main>
              </div>
            ) : (
              // ЛЕНДИНГ ИЛИ ДРУГИЕ СТРАНИЦЫ
              <div>{children}</div>
            )}

            <Toaster position="bottom-right" richColors />
          </GlobalLoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
