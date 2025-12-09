// app/page.tsx
import Link from "next/link";
import {
  Truck,
  Zap,
  DollarSign,
  ArrowRight,
  Shield,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* HERO */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-600 mb-8">
            ФФ24: ФУЛФИЛМЕНТ
          </h1>
          <p className="text-3xl md:text-5xl font-bold text-gray-800 mb-8">
            Быстрее. Точнее. Надежнее.
          </p>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12">
            Мы берем на себя все заботы по упаковке, маркировке, хранению и доставке ваших товаров на склады крупнейших маркетплейсов России.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link
              href="/login"
              className="group bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center gap-4"
            >
              Личный кабинет
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>

            <button className="text-xl font-bold text-purple-600 hover:text-orange-600 transition-colors">
              Рассчитать стоимость →
            </button>
          </div>
        </div>

        {/* АНИМАЦИЯ НА ФОНЕ */}
        <div className="absolute inset-0 pointer-events-none">
          <Truck className="absolute top-20 left-10 text-purple-600/10 w-32 h-32 animate-bounce" />
          <Truck className="absolute bottom-32 right-20 text-orange-600/10 w-40 h-40 animate-bounce delay-300" />
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-600 mb-16">
            Почему выбирают ФФ24?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              {
                icon: Truck,
                title: "Мгновенная обработка",
                desc: "Приемка и отправка заказов в течение 24 часов. Без задержек — только скорость!",
              },
              {
                icon: DollarSign,
                title: "Прозрачные тарифы",
                desc: "Справедливая и понятная цена — рассчитаете стоимость за 1 минуту.",
              },
              {
                icon: Zap,
                title: "Интеграции с маркетплейсами",
                desc: "Автоматизация с Wildberries, Ozon и Яндекс.Маркет.",
              },
              {
                icon: Shield,
                title: "Надежность",
                desc: "WMS-стандарты и видеонаблюдение обеспечивают безопасность ваших товаров.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 bg-gradient-to-br from-purple-50 to-orange-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-4"
              >
                <item.icon className="w-16 h-16 mx-auto mb-6 text-purple-600 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
