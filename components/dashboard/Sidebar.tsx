// components/dashboard/Sidebar.tsx
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Импортируем useRouter
import { LayoutDashboard, Package, ShoppingCart, TrendingUp, Settings, FileText, Zap, LogOut } from 'lucide-react'; // Добавляем LogOut
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

const navItems = [
    { href: '/dashboard', label: 'Дашборд', icon: LayoutDashboard },
    { href: '/dashboard/inventory', label: 'Запасы', icon: Package },
    { href: '/dashboard/orders', label: 'Заказы', icon: ShoppingCart },
    { href: '/dashboard/reports', label: 'Отчеты', icon: FileText },
    { href: '/dashboard/analytics', label: 'Аналитика', icon: TrendingUp },
    { href: '/dashboard/integrations', label: 'Интеграции', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter(); // Инициализируем роутер

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });

            if (res.ok) {
                toast.success('Вы успешно вышли из системы.');
                router.push('/login'); // Перенаправляем на страницу входа
            } else {
                toast.error('Ошибка выхода. Попробуйте снова.');
            }
        } catch (error) {
            toast.error('Ошибка сети при попытке выхода.');
        }
    };

    return (
        <aside className="w-64 bg-gray-900 flex flex-col border-r border-gray-700 h-full fixed top-0 left-0 pt-20">
            <div className="p-4 flex items-center justify-center">
                <Zap className="h-6 w-6 text-accent-DEFAULT" />
                <h1 className="text-xl font-bold text-white ml-2">FF24 ЛКК</h1>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div className={cn(
                                "flex items-center p-3 rounded-lg transition-colors duration-200 group",
                                isActive 
                                    ? "bg-accent-DEFAULT text-gray-900 font-semibold shadow-neon-sm" 
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            )}>
                                <Icon className={cn(
                                    "h-5 w-5 mr-3",
                                    isActive ? "text-gray-900" : "text-gray-500 group-hover:text-accent-DEFAULT"
                                )} />
                                {item.label}
                            </div>
                        </Link>
                    );
                })}
            </nav>
            
            {/* Блок Выхода */}
            <div className="p-4 border-t border-gray-700">
                <button 
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 rounded-lg text-red-400 hover:bg-red-900/50 transition-colors"
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    Выйти из системы
                </button>
            </div>
        </aside>
    );
}
