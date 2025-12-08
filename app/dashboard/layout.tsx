"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  PlusCircle,
  User,
  Boxes,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

import "@/app/dashboard/dashboard.css";
import TruckLoader from "@/components/ui/TruckLoader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Темы интерфейса (A/B — light/dark)
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Глобальная анимация загрузки
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // Меню навигации
  const menu = [
    {
      href: "/dashboard",
      label: "Главная",
      icon: <LayoutDashboard size={18} />,
    },
    {
      href: "/dashboard/orders",
      label: "Заказы",
      icon: <Package size={18} />,
    },
    {
      href: "/dashboard/orders/new",
      label: "Новый заказ",
      icon: <PlusCircle size={18} />,
    },
    {
      href: "/dashboard/stock",
      label: "Склад",
      icon: <Boxes size={18} />,
    },
    {
      href: "/dashboard/profile",
      label: "Профиль",
      icon: <User size={18} />,
    },
  ];

  // Выход
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="ff24-dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-text">FF24</span>
          <span className="logo-sub">Фулфилмент</span>
        </div>

        <nav className="menu">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`menu-item ${
                pathname === item.href ? "active" : ""
              }`}
            >
              <span className="menu-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <button className="logout-btn" onClick={logout}>
          <LogOut size={18} />
          Выйти
        </button>
      </aside>

      {/* Основная область */}
      <main className="content">
        <header className="topbar">
          <div className="top-title">Личный кабинет FF24</div>

          {/* Переключатель тем */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="theme-toggle"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* Глобальная анимация грузовика */}
        {loading && <TruckLoader />}

        {/* Контент */}
        <div
          className={`page-content ${
            loading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
