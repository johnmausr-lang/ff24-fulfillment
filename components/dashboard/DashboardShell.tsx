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
import { useGlobalLoader } from "@/components/providers/global-loader-provider";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { showLoader, hideLoader } = useGlobalLoader();

  // ------------------------------------------
  // Theme Switcher
  // ------------------------------------------
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // ------------------------------------------
  // Sidebar Menu
  // ------------------------------------------
  const menu = [
    { href: "/dashboard", label: "Главная", icon: <LayoutDashboard size={18} /> },
    { href: "/dashboard/orders", label: "Заказы", icon: <Package size={18} /> },
    { href: "/dashboard/orders/new", label: "Новый заказ", icon: <PlusCircle size={18} /> },
    { href: "/dashboard/stock", label: "Склад", icon: <Boxes size={18} /> },
    { href: "/dashboard/profile", label: "Профиль", icon: <User size={18} /> },
  ];

  // ------------------------------------------
  // Logout
  // ------------------------------------------
  const logout = async () => {
    showLoader("Выходим...");

    await fetch("/api/auth/logout", { method: "POST" });
    hideLoader();
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
              className={`menu-item ${pathname === item.href ? "active" : ""}`}
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

      {/* Main Content */}
      <main className="content">
        <header className="topbar">
          <div className="top-title">Личный кабинет FF24</div>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="theme-toggle"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </header>

        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}
