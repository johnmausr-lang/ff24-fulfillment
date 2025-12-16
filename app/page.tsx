// app/page.tsx
import { ArrowRight, Zap, RefreshCw, Layers, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';

const FeatureBlock = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 transition-all duration-300 hover:border-accent-DEFAULT/50 hover:shadow-neon-sm">
        <Icon className="h-8 w-8 text-accent-DEFAULT mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);

export default function HomePage() {
    return (
        <div className="bg-primary-DEFAULT min-h-screen flex flex-col">
            <PublicHeader />
            
            <main className="flex-1">
                {/* Секция 1: Hero */}
                <section className="py-32 text-center bg-gray-950">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <p className="text-sm font-semibold text-accent-DEFAULT uppercase mb-4 tracking-wider">
                            Fulfillment 24/7 для Маркетплейсов
                        </p>
                        <h1 className="text-7xl font-extrabold mb-6 leading-snug text-white">
                            Автоматизируйте свой E-commerce с <span className="text-accent-DEFAULT">Мой Склад</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-10">
                            Полный цикл фулфилмента с бесшовной интеграцией вашего учетного ПО. 
                            Управляйте запасами и заказами через наш технологичный ЛКК.
                        </p>
                        
                        <div className="flex justify-center space-x-4">
                            <Link href="/register" passHref>
                                <Button size="xl" className="text-xl px-10 py-6">
                                    Начать работу бесплатно <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/pricing" passHref>
                                <Button variant="outline" size="xl" className="text-xl px-10 py-6">
                                    Тарифы
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Секция 2: Основные Преимущества */}
                <section className="py-20 bg-gray-900 border-b border-gray-800">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-12 text-white">Почему выбирают FF24?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureBlock
                                icon={RefreshCw}
                                title="Синхронизация с МС"
                                description="Остатки и статусы заказов обновляются автоматически через ваш Мой Склад. Никаких ручных операций."
                            />
                            <FeatureBlock
                                icon={Layers}
                                title="Единый ЛКК"
                                description="Полный контроль над сборкой, маркировкой и отгрузкой на Wildberries, Ozon, Яндекс.Маркет в одном окне."
                            />
                            <FeatureBlock
                                icon={Truck}
                                title="Гибкий FBA/FBS"
                                description="Поддержка всех схем работы маркетплейсов. Мы быстро адаптируемся к новым требованиям и изменениям."
                            />
                        </div>
                    </div>
                </section>

                {/* Секция 3: Призыв к действию */}
                 <section className="py-20 text-center">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <Zap className="h-10 w-10 text-accent-DEFAULT mx-auto mb-4" />
                        <h2 className="text-4xl font-extrabold text-white mb-4">Готовы масштабировать свой бизнес?</h2>
                        <p className="text-lg text-gray-400 mb-8">
                            Начните бесплатно и посмотрите, как FF24 может превратить вашу логистику из проблемы в конкурентное преимущество.
                        </p>
                        <Link href="/register" passHref>
                            <Button size="xl" className="text-xl px-10 py-6">
                                Зарегистрироваться
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
            
            <PublicFooter />
        </div>
    );
}
