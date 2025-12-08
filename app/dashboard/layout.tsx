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
} from "lucide-react";

import "@/app/dashboard/dashboard.css";
import TruckLoader from "@/components/ui/TruckLoader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // -------------------------------
  // THEME STATE (A = minimal, B = neo)
  // -------------------------------
  const [theme, setTheme] = useState<"A" | "B">("B");
  const [loading, setLoading] = useState(true);

  // Load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ff24_theme");
    if (saved === "A" || saved === "B") {
      setTheme(saved);
      document.documentElement.dataset.theme = saved;
    }
  }, []);

  // Apply theme on change
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ff24_theme", theme);
  }, [theme]);

  // Loading animation (truck)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // Navigation menu
  const menu = [
    { href: "/dashboard", label: "Главная", icon: <LayoutDashboard size={18} /> },
    { href: "/dashboard/orders", label: "Заказы", icon: <Package size={18} /> },
    { href: "/dashboard/orders/new", label: "Новый заказ", icon: <PlusCircle size={18} /> },
    { href: "/dashboard/stock", label: "Склад", icon: <Boxes size={18} /> },
    { href: "/dashboard/profile", label: "Профиль", icon: <User size={18} /> },
  ];

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="ff24-dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="logo">
          <span className="logo-text">FF24</span>
          <span className="logo-sub">Фулфилмент</span>
        </div>

        {/* MENU */}
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

        {/* THEME SWITCHER BLOCK */}
        <div className="theme-block">
          <div className="theme-title">Тема интерфейса</div>

          <div className="theme-options">
            {/* Theme A */}
            <div
              className={`theme-preview ${theme === "A" ? "selected" : ""}`}
              onClick={() => setTheme("A")}
            >
              <div className="theme-thumb theme-a"></div>
              <div className="theme-label">A — Minimal</div>
            </div>

            {/* Theme B */}
            <div
              className={`theme-preview ${theme === "B" ? "selected" : ""}`}
              onClick={() => setTheme("B")}
            >
              <div className="theme-thumb theme-b"></div>
              <div className="theme-label">B — Neo UI</div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button className="logout-btn" onClick={logout}>
          <LogOut size={18} />
          Выйти
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        {/* Truck Loading Animation */}
        {loading && <TruckLoader />}

        <div
          className={`page-content ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
