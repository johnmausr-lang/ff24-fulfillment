// app/page.tsx

import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// 1. Ленивая загрузка и отключение SSR для 3D (КРИТИЧНО)
const HeroCanvas = dynamic(() => import('@/components/hero/HeroCanvas'), { 
    ssr: false 
});

export default function Home() {
  return (
    // ⚠️ Высота в 300vh создает скролл, который управляет камерой
    <main className="relative w-full h-[300vh] overflow-x-hidden text-white"> 
      
      {/* ========================================
        A) ФИКСИРОВАННЫЙ CANVAS (Слой Z-0)
        ========================================
      */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <HeroCanvas />
      </div>

      {/* ========================================
        B) HTML OVERLAY (Слои Z-10 и Z-20)
        ========================================
      */}
      <Header /> 
      
      <div className="relative z-10 pointer-events-none">
        {/* --- 1. ПЕРВЫЙ ПОРТАЛ: HERO --- */}
        <section className="h-screen flex items-center justify-center p-8">
          <div className="text-center pointer-events-auto max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-tight shadow-neon-text tracking-tighter">
              SCENE-FIRST: Фулфилмент, <br/> который **работает в 3D**
            </h1>
            <p className="mt-6 text-xl text-accent-DEFAULT font-mono">
              Ваш склад работает 24/7. Управляйте логистикой из футуристичного дашборда.
            </p>
            <Button size="lg" className="mt-10" asChild>
                <Link href="/pricing">
                    Рассчитать стоимость 
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
          </div>
        </section>
        
        {/* --- 2. ВТОРОЙ ПОРТАЛ: ИНТЕГРАЦИЯ --- */}
        {/* Контент здесь будет виден, когда камера приблизится к pos2 (CameraRig) */}
        <section className="h-screen pt-40 flex items-start justify-start p-20">
          <div className="pointer-events-auto max-w-md bg-black/80 backdrop-blur-sm p-8 rounded-xl border border-accent-DEFAULT/30 shadow-2xl">
            <h2 className="text-4xl font-bold text-accent-DEFAULT">Интеграция с Мой Склад</h2>
            <p className="mt-4 text-white/90">
              Полная синхронизация остатков, статусов и заказов в реальном времени. Мы обеспечиваем бесшовный обмен данными. 
            </p>
            <Button variant="link" className="mt-4 p-0">
                Подробнее о API-модуле
            </Button>
          </div>
        </section>

        {/* --- 3. ТРЕТИЙ ПОРТАЛ: КОНТАКТЫ/СТАТИСТИКА --- */}
        {/* Контент здесь будет виден, когда камера приблизится к pos3 (CameraRig) */}
        <section className="h-screen flex items-end justify-end p-20">
             <div className="pointer-events-auto max-w-md bg-primary-DEFAULT/90 backdrop-blur-sm p-8 rounded-xl border border-accent-DEFAULT/30 shadow-2xl text-center">
                <p className="text-5xl font-extrabold text-accent-DEFAULT">99.8%</p>
                <p className="mt-2 text-white">Точность комплектации заказов</p>
                <Button size="default" className="mt-6" asChild>
                    <Link href="/contact">Связаться с менеджером</Link>
                </Button>
            </div>
        </section>
      </div>

    </main>
  );
}
