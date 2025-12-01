import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, TrendingUp, DollarSign, LogOut, Settings } from 'lucide-react';
import Logo from '@/components/Logo'; // Используем наш логотип

const dashboardNav = [
  { name: 'Обзор (Дашборд)', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Складские остатки', href: '/dashboard/stock', icon: Package },
  { name: 'История заказов', href: '/dashboard/orders', icon: TrendingUp },
  { name: 'Финансы и отчеты', href: '/dashboard/finance', icon: DollarSign },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Настройка страницы Дашборда
  return (
    <div className="min-h-screen flex bg-background">
      
      {/* Боковая панель (Sidebar) */}
      <aside className="w-64 bg-primary text-white flex flex-col fixed h-full shadow-lg z-20">
        <div className="p-6 border-b border-white/10 h-20 flex items-center">
          {/* Логотип в белом цвете для темного фона */}
          <Link href="/" className="flex items-center group">
              <div className="flex flex-col">
                  <div className="flex items-center text-3xl font-extrabold text-white">
                      <span className="tracking-tighter">FF</span>
                      <div className="relative flex items-center ml-[-8px]">
                          <svg 
                              className="w-8 h-8 text-accent" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                          >
                              <polyline points="16 17 21 12 16 7" className="stroke-accent/90" />
                              <line x1="4" y1="12" x2="21" y2="12" />
                          </svg>
                          <span className="ml-[-8px] tracking-tighter z-10">24</span>
                      </div>
                  </div>
                  <span className="text-xs tracking-widest uppercase mt-[-6px] text-white/70">
                      Личный кабинет
                  </span>
              </div>
          </Link>
        </div>

        {/* Навигация */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {dashboardNav.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              // Добавим класс 'active' на основе текущего пути (простая имитация)
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 
                ${item.href === '/dashboard' ? 'bg-white/10 text-accent font-semibold' : 'text-white/80 hover:bg-white/5 hover:text-accent'}`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Настройки и Выход */}
        <div className="p-4 border-t border-white/10 space-y-2">
            <Link href="/dashboard/settings" className="flex items-center px-4 py-2 rounded-lg text-white/80 hover:bg-white/5 hover:text-accent transition-colors">
                <Settings className="w-5 h-5 mr-3" />
                Настройки
            </Link>
            <Link href="/" className="flex items-center px-4 py-2 rounded-lg text-red-300 hover:bg-white/5 transition-colors">
                <LogOut className="w-5 h-5 mr-3" />
                Выход
            </Link>
        </div>
      </aside>

      {/* Основной контент */}
      <div className="flex-1 md:ml-64 p-8">
        {children}
      </div>
    </div>
  );
}
