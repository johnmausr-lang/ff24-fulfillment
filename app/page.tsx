import Link from "next/link";
import { ArrowRight, Truck, Shield, Zap, DollarSign, Clock } from "lucide-react";
import PriceCalculator from "@/components/PriceCalculator";
import ProcessTimeline from "@/components/ProcessTimeline";
import ContactForm from "@/components/ContactForm";
import IntegrationsSlider from "@/components/IntegrationsSlider";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D7FF00] via-[#F4FF7A] to-white">

      {/* HERO */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">

          {/* Logo */}
          <div className="flex justify-center mb-10">
            <img
              src="/logo-ff24.png" 
              alt="FF24"
              className="h-32 drop-shadow-xl"
            />
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-[#21004B] mb-8 drop-shadow-md">
            ФФ24: ФУЛФИЛМЕНТ
          </h1>

          <p className="text-3xl md:text-4xl font-bold text-[#21004B] mb-6 opacity-90">
            Быстро. Надёжно. Профессионально.
          </p>

          <p className="text-xl md:text-2xl text-[#21004B] opacity-80 max-w-4xl mx-auto mb-14 leading-relaxed">
            Полный комплекс услуг по упаковке, обработке, хранению и доставке товаров 
            для маркетплейсов. Технологично. Прозрачно. С фокусом на результат.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">

            {/* Фирменная кнопка */}
            <Link
              href="/login"
              className="
                group bg-gradient-to-r from-[#21004B] to-[#4B2C82]
                hover:from-[#320072] hover:to-[#1a0033]
                text-[#D7FF00] font-bold text-2xl
                px-14 py-6 rounded-full shadow-[0_6px_30px_rgba(33,0,75,0.45)]
                transform hover:scale-110 transition-all duration-300
                flex items-center gap-4
              "
            >
              Личный кабинет
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </Link>

            <button className="text-2xl font-bold text-[#21004B] hover:text-[#4B2C82] transition">
              Рассчитать стоимость →
            </button>
          </div>
        </div>

        {/* Фоновые грузовики */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <Truck className="absolute top-20 left-10 w-40 h-40 text-[#21004B] animate-pulse" />
          <Truck className="absolute bottom-24 right-24 w-48 h-48 text-[#21004B] animate-pulse delay-300" />
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-black text-[#21004B] mb-20">
            Почему выбирают FF24?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              {
                icon: Truck,
                title: "Мгновенная обработка",
                desc: "Приемка, маркировка и отправка товаров в течение 24 часов.",
              },
              {
                icon: DollarSign,
                title: "Прозрачные тарифы",
                desc: "Честная фиксированная стоимость — без скрытых платежей.",
              },
              {
                icon: Zap,
                title: "Интеграция с маркетплейсами",
                desc: "Автоматический обмен данными с WB, OZON, YM.",
              },
              {
                icon: Shield,
                title: "Контроль качества",
                desc: "Видео-наблюдение и строгий WMS-контроль хранения.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  group p-10 rounded-3xl
                  bg-white shadow-xl border-2 border-[#21004B]/10
                  hover:shadow-2xl hover:-translate-y-3 transition
                "
              >
                <item.icon
                  className="w-20 h-20 mx-auto mb-6 text-[#21004B] group-hover:scale-110 transition-transform"
                />
                <h3 className="text-2xl font-bold text-[#21004B] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#21004B]/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАЛЬКУЛЯТОР */}
      <PriceCalculator />

      {/* ПРОЦЕСС */}
      <ProcessTimeline />

      {/* ИНТЕГРАЦИИ */}
      <IntegrationsSlider />

      {/* КОНТАКТЫ */}
      <ContactForm />
    </div>
  );
}
