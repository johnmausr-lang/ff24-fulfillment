'use client';

import { Package, TrendingUp, DollarSign, Truck } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';

export default function DashboardPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-content mb-8">Сводная панель ФФ24</h1>

            {/* Карточки */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {dashboardMetrics.map((metric, i) => (
                    <div
                        key={i}
                        className="bg-white p-6 rounded-xl shadow-md border-b-4 border-primary/20 hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-content/70">{metric.title}</p>
                            <metric.icon className={`w-6 h-6 p-1 rounded-full ${metric.color}`} />
                        </div>

                        <div className="mt-4">
                            <span className="text-4xl font-extrabold text-content">{metric.value}</span>
                            <span className="text-base text-content/60 ml-2">{metric.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            <LogoutButton />
        </div>
    );
}

const dashboardMetrics = [
    {
        title: 'Остаток SKU на складе',
        value: '14 520',
        unit: 'ед.',
        icon: Package,
        color: 'text-primary bg-primary/10',
    },
    {
        title: 'Обработано заказов (месяц)',
        value: '3 218',
        unit: 'шт.',
        icon: TrendingUp,
        color: 'text-accent bg-accent/10',
    },
    {
        title: 'Баланс счета',
        value: '45 800',
        unit: '₽',
        icon: DollarSign,
        color: 'text-green-600 bg-green-100',
    },
    {
        title: 'Заявок на отгрузку',
        value: '4',
        unit: 'активных',
        icon: Truck,
        color: 'text-orange-600 bg-orange-100',
    },
];
