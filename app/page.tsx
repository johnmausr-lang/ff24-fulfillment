// app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Предполагаем, что Button импортируется отсюда
import { ArrowRight, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* 1. Навигация */}
      <header className="fixed top-0 w-full z-20 bg-gray-950/90 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center text-2xl font-bold text-accent-DEFAULT">
              <Zap className="h-6 w-6 mr-2" />
              FF24 ЛКК
            </div>
          </Link>
          <nav className="space-x-4">
            <Link href="/about" className="text-gray-400 hover:text-accent-DEFAULT transition-colors">О нас</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-accent-DEFAULT transition-colors">Цены</Link>
            <Link href="/login" passHref>
              <Button variant="outline" className="border-accent-DEFAULT text-accent-DEFAULT hover:bg-accent-DEFAULT hover:text-gray-950">
                Войти
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* 2. Главная секция (Hero) */}
      <main className="flex-1 flex flex-col justify-center items-center text-center pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-sm font-semibold text-accent-DEFAULT mb-4 uppercase tracking-widest shadow-neon-sm p-1 inline-block rounded-full bg-gray-900/50">
            Фулфилмент 24/7
          </p>
          <h1 className="text-6xl font-extrabold mb-6 leading-tight">
            Управляйте <span className="text-accent-DEFAULT">товарными запасами</span> на маркетплейсах
            <span className="block mt-2">в едином окне.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Автоматическая синхронизация с Мой Склад, учет остатков, управление заказами и быстрая отгрузка — все для вашего роста.
          </p>

          {/* Кнопки действий */}
          <div className="flex justify-center space-x-4">
            <Link href="/register" passHref>
                {/* ИСПРАВЛЕНО: size="xl" заменено на size="lg" */}
                <Button size="lg" className="text-xl px-10 py-6">
                    Начать работу бесплатно <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </Link>
            <Link href="/login" passHref>
              <Button variant="outline" size="lg" className="text-xl px-10 py-6">
                Войти в ЛКК
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* 3. Футер (Минимальный) */}
      <footer className="p-4 border-t border-gray-800 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} FF24 Fulfillment Platform. Все права защищены.
      </footer>
    </div>
  );
}
