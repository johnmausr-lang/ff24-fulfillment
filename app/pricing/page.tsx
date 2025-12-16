// app/pricing/page.tsx

import { Zap, Tag, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Компонент TariffCard (переиспользуем, если нужно)
const TariffCardComponent = ({ title, price, features, isFeatured }: { title: string, price: string, features: string[], isFeatured: boolean }) => (
    <div className={`p-8 rounded-2xl border-4 flex flex-col transition-all duration-300 h-full ${isFeatured 
        ? 'bg-accent-DEFAULT/10 border-accent-DEFAULT shadow-neon' 
        : 'bg-gray-800 border-gray-700 hover:border-accent-DEFAULT/50'}`}>
        
        <h3 className="text-3xl font-bold mb-2 text-white">{title}</h3>
        <p className={`text-4xl font-extrabold mb-6 ${isFeatured ? 'text-accent-DEFAULT' : 'text-white'}`}>{price}</p>
        
        <ul className="space-y-3 text-gray-300 mb-8 flex-1">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <Zap className="h-5 w-5 mr-3 flex-shrink-0 text-accent-DEFAULT mt-1" />
                    <span className='flex-1'>{feature}</span>
                </li>
            ))}
        </ul>
        
        <Button size="lg" className="w-full text-lg mt-auto" asChild>
            <Link href="/register">{isFeatured ? 'Начать сейчас' : 'Связаться с нами'}</Link>
        </Button>
    </div>
);

// Основная страница
export default function PricingPage() {
    return (
        <div className="bg-primary-DEFAULT text-white">
            
            {/* Секция 1: Hero */}
            <section className="py-20 text-center border-b border-gray-800">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-6xl font-extrabold mb-4 leading-tight">
                        Прозрачные Тарифы без Скрытых <span className="text-accent-DEFAULT">Платежей</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-8">
                        Выберите план, который подходит вашему объему продаж. Платите только за те услуги,
                        которые реально используете.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Tag className='h-6 w-6 text-accent-DEFAULT' />
                        <p className="text-lg text-gray-300">Интеграция с Мой Склад всегда **бесплатна**.</p>
                    </div>
                </div>
            </section>

            {/* Секция 2: Тарифные Планы */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">Наши Основные Пакеты</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <TariffCardComponent
                            title="Старт"
                            price="от 35 ₽ / ед."
                            features={[
                                "Идеально для тестирования ниши.",
                                "До 500 отгрузок в месяц.",
                                "Базовая маркировка.",
                                "Поддержка в рабочее время.",
                                "FBA/FBS",
                            ]}
                            isFeatured={false}
                        />

                        <TariffCardComponent
                            title="ПРОДАВЕЦ"
                            price="от 20 ₽ / ед."
                            features={[
                                "Оптимальное решение для растущего бизнеса.",
                                "Безлимитное количество отгрузок.",
                                "Полный контроль через ЛКК.",
                                "Расширенная отчетность.",
                                "Приоритетная сборка.",
                            ]}
                            isFeatured={true}
                        />

                        <TariffCardComponent
                            title="ЭКСПЕРТ"
                            price="Индивидуально"
                            features={[
                                "Для крупных селлеров и брендов.",
                                "Персональный менеджер 24/7.",
                                "Специальные условия хранения.",
                                "Интеграция с вашими сторонними системами (API).",
                                "Консолидация поставок.",
                            ]}
                            isFeatured={false}
                        />

                    </div>
                    
                    <div className="text-center mt-16 p-6 bg-gray-800 rounded-xl border border-gray-700">
                        <p className="text-xl text-gray-300">
                            Все тарифы включают **бесплатное подключение** и **интеграцию** с Мой Склад.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
