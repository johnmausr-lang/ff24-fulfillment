// app/dashboard/layout.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, PlusCircle, User, Boxes, LogOut } from "lucide-react";
import "@/app/dashboard/dashboard.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"A" | "B">("B");

  useEffect(() => {
    const saved = localStorage.getItem("ff24_theme") as "A" | "B" | null;
    const newTheme = saved || "B";
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ff24_theme", theme);
  }, [theme]);

  const menu = [
    { href: "/dashboard", label: "Главная", icon: <LayoutDashboard size={18} /> },
    { href: "/dashboard/orders", label: "Заказы", icon: <Package size={18} /> },
    { href: "/dashboard/orders/new", label: "Новый заказ", icon: <PlusCircle size={18} /> },
    { href: "/dashboard/stock", label: "Склад", icon: <Boxes size={18} /> },
    { href: "/dashboard/profile", label: "Профиль", icon: <User size={18} /> },
  ];

  return (
    <div className="ff24-dashboard">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-main">FF24</span>
          <span className="logo-sub">Фулфилмент</span>
        </div>

        <nav className="menu">
          {menu.map((item) => (
            <Link key={item.href} href={item.href} className={`menu-item ${pathname === item.href ? "active" : ""}`}>
              <span className="menu-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="theme-block">
          <div className="theme-title">Тема</div>
          <div className="theme-options">
            <div className={`theme-preview ${theme === "A" ? "selected" : ""}`} onClick={() => setTheme("A")}>
              <div className="theme-thumb theme-a"></div>
              <div className="theme-label">Minimal</div>
            </div>
            <div className={`theme-preview ${theme === "B" ? "selected" : ""}`} onClick={() => setTheme("B")}>
              <div className="theme-thumb theme-b"></div>
              <div className="theme-label">Neo UI</div>
            </div>
          </div>
        </div>

        <button className="logout-btn">
          <LogOut size={18} /> Выйти
        </button>
      </aside>

      <main className="content">
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}
