// app/dashboard/page.tsx
import { Package, Truck, Zap, ShoppingCart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// УДАЛЕН ИМПОРТ: import { Card, CardHeader, CardContent } from '@/components/ui/card'; // Предполагаем наличие Card компонента

// Временная заглушка для Card (можете использовать свою или создать)
const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`rounded-xl bg-gray-800 border border-gray-700 p-6 ${className}`}>
        {children}
    </div>
);
const CardHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4 text-gray-400 text-sm font-semibold">{children}</div>
);
const CardContent = ({ children }: { children: React.ReactNode }) => (
    <div className="text-white text-3xl font-bold">{children}</div>
);

// Моки данных
const stats = [
    { 
        title: 'Активные Заказы', 
        value: '145', 
        icon: ShoppingCart, 
        color: 'text-accent-DEFAULT', 
        link: '/dashboard/orders' 
    },
    { 
        title: 'Остаток SKU', 
        value: '3,120 ед.', 
        icon: Package, 
        color: 'text-blue-400', 
        link: '/dashboard/inventory' 
    },
    { 
        title: 'Средняя скорость сбора', 
        value: '4.2 мин', 
        icon: Zap, 
        color: 'text-yellow-400', 
        link: '/dashboard/analytics' 
    },
    { 
        title: 'Интеграция с МС', 
        value: 'Активна', 
        icon: CheckCircle, 
        color: 'text-green-500', 
        link: '/dashboard/integrations' 
    },
];

const QuickActions = () => (
    <div className="col-span-full lg:col-span-1">
        <h2 className="text-2xl font-bold mb-4 text-white">Быстрые Действия</h2>
        <div className="space-y-4">
            <Button size="lg" className="w-full text-lg" asChild>
                <Link href="/dashboard/orders/new">Создать Новый Заказ</Link>
            </Button>
            <Button variant="secondary" size="lg" className="w-full text-lg" asChild>
                <Link href="/dashboard/inventory/receipt">Оформить Поступление</Link>
            </Button>
            <Button variant="secondary" size="lg" className="w-full text-lg">
                Запустить Принудительную Синхронизацию
            </Button>
        </div>
    </div>
);


export default function DashboardPage() {
    return (
        <div className="space-y-10">
            <h1 className="text-4xl font-extrabold text-white">Главный Дашборд</h1>
            
            {/* Секция 1: Метрики */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <Link href={stat.link}>
                            <CardHeader>
                                <stat.icon className={`h-6 w-6 ${stat.color} mb-2`} />
                                {stat.title}
                            </CardHeader>
                            <CardContent>{stat.value}</CardContent>
                        </Link>
                    </Card>
                ))}
            </div>

            {/* Секция 2: Заказы и Быстрые Действия */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Таблица последних заказов (Мок) */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-4 text-white">Последние Заказы (MS Sync)</h2>
                    <Card className="p-0">
                        <div className="p-4 border-b border-gray-700 font-semibold text-gray-300 grid grid-cols-4">
                            <span>ID Заказа</span>
                            <span>Статус</span>
                            <span>Маркетплейс</span>
                            <span>Дата Создания</span>
                        </div>
                        <div className="divide-y divide-gray-700">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="p-4 grid grid-cols-4 hover:bg-gray-700 transition-colors">
                                    <span className="text-accent-DEFAULT">#FF24-{1000 + i}</span>
                                    <span className="text-yellow-400">В сборке</span>
                                    <span>Wildberries</span>
                                    <span className="text-gray-400">2025-12-16</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Быстрые Действия */}
                <QuickActions />
            </div>

        </div>
    );
}
