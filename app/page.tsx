// app/page.tsx
import Link from "next/link";
import { Truck, Zap, Lock, DollarSign, ArrowRight } from "lucide-react";
import PriceCalculator from "@/components/PriceCalculator";
import ProcessTimeline from "@/components/ProcessTimeline";
import IntegrationsSlider from "@/components/IntegrationsSlider";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:to-black">
      {/* HERO */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-600 mb-6">
            ФФ24: ФУЛФИЛМЕНТ
          </h1>
          <p className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8">
            Быстрее. Точнее. Надежнее.
          </p>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12">
            Мы берем на себя все заботы по упаковке, маркировке, хранению и доставке ваших товаров на склады крупнейших маркетплейсов России.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/login"
              className="group bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white font-bold text-xl px-10 py-5 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center gap-3"
            >
              Личный кабинет
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <button className="text-xl font-semibold text-purple-600 dark:text-purple-400 hover:underline">
              Рассчитать цену за 1 минуту →
            </button>
          </div>
        </div>

        {/* Анимированный грузовик на фоне */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-20 left-10 text-9xl animate-bounce">Truck</div>
          <div className="absolute bottom-20 right-10 text-9xl animate-bounce delay-300">Truck</div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-600 mb-16">
            Почему выбирают ФФ24?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              { icon: Truck, title: "Мгновенная обработка", desc: "Приемка и отправка заказов в течение 24 часов. Никаких задержек — только скорость!" },
              { icon: DollarSign, title: "Прозрачные тарифы", desc: "Справедливая и понятная цена, которая не изменится. Рассчитайте стоимость прямо на сайте." },
              { icon: Zap, title: "Интеграция с маркетплейсами", desc: "Полная автоматизация обмена данными с Wildberries, Ozon и Яндекс.Маркет." },
              { icon: Lock, title: "Контроль и надежность", desc: "Система видеонаблюдения и строгое соблюдение WMS-стандартов для сохранности вашего товара." },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-purple-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <item.icon className="w-16 h-16 mx-auto mb-6 text-purple-600" />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Остальные секции */}
      <PriceCalculator />
      <ProcessTimeline />
      <IntegrationsSlider />
      <ContactForm />
    </div>
  );
}
