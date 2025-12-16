// app/services/page.tsx

import { Truck, Package, Scan, Layers, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Компонент для секции "Преимущества"
const FeatureCard = ({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) => (
    <div className={`p-6 rounded-xl bg-gray-900 border border-gray-800 shadow-2xl transition-all duration-300 hover:border-accent-DEFAULT/50 hover:shadow-neon-sm`}>
        <Icon className={`h-8 w-8 ${color} mb-4`} />
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

// Компонент для тарифов
const TariffCard = ({ title, price, features, isFeatured }: { title: string, price: string, features: string[], isFeatured: boolean }) => (
    <div className={`p-8 rounded-2xl border-4 transition-all duration-300 ${isFeatured 
        ? 'bg-accent-DEFAULT/10 border-accent-DEFAULT shadow-neon' 
        : 'bg-gray-800 border-gray-700 hover:border-accent-DEFAULT/50'}`}>
        
        <h3 className="text-3xl font-bold mb-2 text-white">{title}</h3>
        <p className={`text-4xl font-extrabold mb-6 ${isFeatured ? 'text-accent-DEFAULT' : 'text-white'}`}>{price}</p>
        
        <ul className="space-y-3 text-gray-300 mb-8">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <Zap className="h-5 w-5 mr-3 flex-shrink-0 text-accent-DEFAULT mt-1" />
                    <span className='flex-1'>{feature}</span>
                </li>
            ))}
        </ul>
        
        <Button size="lg" className="w-full text-lg" asChild>
            <Link href="/register">{isFeatured ? 'Начать сейчас' : 'Подключить'}</Link>
        </Button>
    </div>
);

// Основная страница
export default function ServicesPage() {
    return (
        <div className="bg-primary-DEFAULT text-white">
            
            {/* Секция 1: Hero */}
            <section className="py-20 text-center border-b border-gray-800">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-6xl font-extrabold mb-4 leading-tight">
                        Fulfillment, Сфокусированный на <span className="text-accent-DEFAULT">E-commerce</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-8">
                        Мы берем на себя всю логистику: от приема товара до отгрузки на Wildberries и Ozon. 
                        Синхронизация с Мой Склад в реальном времени.
                    </p>
                    <Button size="xl" className="text-xl px-10 py-6" asChild>
                        <Link href="/register">Получить Коммерческое Предложение</Link>
                    </Button>
                </div>
            </section>

            {/* Секция 2: Как это работает */}
            <section className="py-20 border-b border-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">Комплексные Услуги FF24</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Package}
                            title="Приемка и Хранение"
                            description="Принимаем ваш товар, проверяем качество и размещаем на современном складе с учетом всех требований маркетплейсов."
                            color="text-accent-DEFAULT"
                        />
                         <FeatureCard
                            icon={Scan}
                            title="Сборка и Маркировка (FBO/FBS)"
                            description="Оперативно собираем заказы, проводим штрихкодирование и маркировку Честный Знак. Полное соответствие требованиям МП."
                            color="text-blue-400"
                        />
                        <FeatureCard
                            icon={Truck}
                            title="Доставка до МП"
                            description="Ежедневная отгрузка на склады Wildberries, Ozon, Яндекс.Маркет и другие. Гарантия своевременной доставки."
                            color="text-yellow-400"
                        />
                    </div>
                </div>
            </section>
            
            {/* Секция 3: Преимущества (Технологии) */}
            <section className="py-20 border-b border-gray-800">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-4xl font-bold text-center mb-12">Технологии, которые экономят ваше время</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-accent-DEFAULT">Интеграция с Мой Склад</h3>
                            <p className="text-gray-400">
                                Забудьте о ручном учете. Мы автоматически синхронизируем остатки и статусы заказов, 
                                используя ваш аккаунт Мой Склад. Всегда актуальные данные.
                            </p>
                            <div className='flex items-center text-lg text-white font-medium'>
                                <Layers className='h-6 w-6 mr-2 text-blue-400' />
                                Управление через единый дашборд FF24.
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-accent-DEFAULT">Скорость и Точность</h3>
                            <p className="text-gray-400">
                                Использование WMS-системы и сканирования на каждом этапе гарантирует точность сбора 99.9%. 
                                Ваши клиенты получают то, что заказали, вовремя.
                            </p>
                            <div className='flex items-center text-lg text-white font-medium'>
                                <TrendingUp className='h-6 w-6 mr-2 text-yellow-400' />
                                Снижение штрафов от маркетплейсов.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
