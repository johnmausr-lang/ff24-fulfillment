// app/services/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Предполагаем, что компонент Button находится здесь
import { CheckCircle, Zap, Package, Truck, LayoutDashboard } from 'lucide-react';

// Компонент, описывающий преимущества
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4 bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-accent-DEFAULT transition-colors duration-300">
    <div className="text-accent-DEFAULT flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);


export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col pt-24">
      
      {/* 1. Секция Hero для услуг */}
      <header className="py-20 text-center border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Комплексные <span className="text-accent-DEFAULT">решения</span> для вашего фулфилмента
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            От интеграции с маркетплейсами до отгрузки заказов — автоматизируйте каждый шаг.
          </p>

          <div className="flex justify-center space-x-4">
            {/* ИСПРАВЛЕНИЕ: size="xl" заменено на size="lg" */}
            <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link href="/register">Начать Автоматизацию</Link>
            </Button>
            <Button variant="secondary" size="lg" className="text-lg px-8 py-4" asChild>
                <Link href="/login">Смотреть демо</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* 2. Секция ключевых преимуществ */}
      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Что мы предлагаем?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature
              icon={<LayoutDashboard className="h-8 w-8" />}
              title="Единый личный кабинет"
              description="Управляйте всеми заказами и остатками со всех маркетплейсов в одном простом интерфейсе."
            />
            <Feature
              icon={<Package className="h-8 w-8" />}
              title="Автоматизация сборки"
              description="Интеграция с Мой Склад позволяет моментально создавать отгрузки и печатать наклейки."
            />
            <Feature
              icon={<Zap className="h-8 w-8" />}
              title="Моментальная синхронизация"
              description="Остатки товаров обновляются в реальном времени, предотвращая оверселл и ошибки."
            />
            <Feature
              icon={<Truck className="h-8 w-8" />}
              title="Логистический контроль"
              description="Отслеживание статусов заказов и уведомления о ключевых этапах доставки."
            />
             <Feature
              icon={<CheckCircle className="h-8 w-8" />}
              title="Точность и надежность"
              description="Минимизация человеческого фактора благодаря автоматическим проверкам и валидации данных."
            />
             <Feature
              icon={<CheckCircle className="h-8 w-8" />}
              title="Поддержка 24/7"
              description="Наша команда всегда готова помочь с интеграцией и решением любых возникающих проблем."
            />
          </div>
        </div>
      </main>

      {/* 3. Секция Call-to-Action */}
      <section className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Готовы вывести бизнес на новый уровень?
          </h2>
          <p className="text-xl text-gray-400 mb-6">
            Синхронизация с Мой Склад в реальном времени.
          </p>
          <div className="flex justify-center">
            {/* ИСПРАВЛЕНИЕ: size="xl" заменено на size="lg" */}
            <Button size="lg" className="text-xl px-10 py-6" asChild>
                <Link href="/register">Получить Коммерческое Предложение</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Футер */}
      <footer className="p-4 border-t border-gray-800 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} FF24 Fulfillment Platform.
      </footer>
    </div>
  );
}
