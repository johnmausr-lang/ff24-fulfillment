// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import GlobalLoaderProvider from "@/components/providers/global-loader-provider";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ФФ24: Фулфилмент. Быстрее. Точнее. Надежнее.",
  description: "Быстрый и надёжный фулфилмент для Wildberries, Ozon, Яндекс Маркет. Интеграция с МойСклад.",
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

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <GlobalLoaderProvider>
            {!isDashboard ? (
              // ЛЕНДИНГ — с кнопкой "Личный кабинет" вверху
              <div>
                <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
                  <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    {/* Логотип — как на Vercel */}
                    <Link href="/" className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-yellow-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xl">FF</span>
                        </div>
                        <div className="absolute -right-1 bottom-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
                          <span className="text-purple-600 font-bold text-sm">24</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-xl text-purple-600">ФФ24</span>
                        <span className="text-sm text-gray-600">Фулфилмент</span>
                      </div>
                    </Link>

                    {/* Кнопка Личный кабинет */}
                    <Link
                      href="/dashboard"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                      Личный кабинет
                    </Link>
                  </div>
                </header>
                <main>{children}</main>
              </div>
            ) : (
              // ДАШБОРД — с сайдбаром
              <div className="flex min-h-screen">
                <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col">
                  <div className="mb-10">
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-yellow-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xl">FF</span>
                        </div>
                        <div className="absolute -right-1 bottom-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-sm">24</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-xl text-purple-600">ФФ24</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Фулфилмент</span>
                      </div>
                    </Link>
                  </div>

                  <nav className="space-y-2 flex-1">
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
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                          pathname === item.href
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <item.icon size={20} />
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                      <span>{theme === "dark" ? "Светлая" : "Тёмная"}</span>
                    </button>
                  </div>
                </aside>
                <main className="flex-1 p-8">
                  <div className="max-w-7xl mx-auto">{children}</div>
                </main>
              </div>
            )}

            <Toaster position="bottom-right" richColors closeButton />
          </GlobalLoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
