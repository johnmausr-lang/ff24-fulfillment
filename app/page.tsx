"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Truck, Shield, Zap, DollarSign } from "lucide-react";
import PriceCalculator from "@/components/PriceCalculator";
import ProcessTimeline from "@/components/ProcessTimeline";
import IntegrationsSlider from "@/components/IntegrationsSlider";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#D7FF00] overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative py-32 px-6">

        {/* PARALLAX BACKGROUND TRUCKS */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-20"
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 14 }}
        >
          <Truck className="absolute top-16 left-16 w-48 h-48 text-[#21004B]" />
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none opacity-20"
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ repeat: Infinity, duration: 18, delay: 1 }}
        >
          <Truck className="absolute bottom-16 right-24 w-56 h-56 text-[#21004B]" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto text-center">

          {/* LOGO */}
          <motion.img
            src="/logo-ff24.png"
            alt="FF24"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="h-40 mx-auto drop-shadow-[0_10px_40px_rgba(0,0,0,0.33)] mb-8"
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-7xl md:text-9xl font-black text-[#21004B]"
          >
            ФФ24 Фулфилмент
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3 }}
            className="text-3xl md:text-4xl mt-6 font-semibold text-[#21004B]/90"
          >
            Премиальный сервис обработки заказов
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
            className="text-xl md:text-2xl mt-6 max-w-4xl mx-auto text-[#21004B]/80 leading-relaxed"
          >
            Скорость. Контроль. Упаковка. Интеграции. Доставка.
            Всё под ключ для вашего бренда.
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col sm:flex-row justify-center gap-8 mt-14"
          >
            <Link
              href="/login"
              className="
                group relative px-16 py-6 text-2xl font-bold rounded-full
                bg-gradient-to-r from-[#21004B] to-[#4B2C82]
                text-[#D7FF00]
                shadow-[0_10px_40px_rgba(33,0,75,0.5)]
                hover:scale-110 transition-all duration-300
                flex items-center gap-4
              "
            >
              Войти в ЛК
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </Link>

            <button className="text-2xl font-bold text-[#21004B] hover:text-[#4B2C82] transition">
              Рассчитать стоимость →
            </button>
          </motion.div>
        </div>
      </section>

      {/* =============== ПРЕИМУЩЕСТВА =============== */}
      <section className="py-32 px-6 bg-white rounded-t-[70px] shadow-[0_-20px_60px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl md:text-6xl font-black text-[#21004B] text-center mb-20">
            Почему бренды выбирают FF24
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              {
                icon: Truck,
                title: "До 24 часов на отправку",
                desc: "Молниеносная обработка и упаковка без задержек."
              },
              {
                icon: Shield,
                title: "Контроль хранения",
                desc: "Видео-наблюдение, доступ к данным, полная прозрачность."
              },
              {
                icon: Zap,
                title: "Интеграции с MP",
                desc: "Полный обмен данными с WB, Ozon, YM в реальном времени."
              },
              {
                icon: DollarSign,
                title: "Честные тарифы",
                desc: "Понятная стоимость, никаких скрытых платежей."
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.06, y: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="
                  bg-white rounded-3xl p-10 shadow-xl border-2 border-[#21004B]/10 
                  cursor-pointer"
              >
                <item.icon className="w-20 h-20 mx-auto mb-6 text-[#21004B]" />
                <h3 className="text-2xl font-bold text-[#21004B] mb-4 text-center">
                  {item.title}
                </h3>
                <p className="text-[#21004B]/70 text-center">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <PriceCalculator />

      {/* PROCESS */}
      <ProcessTimeline />

      {/* INTEGRATIONS */}
      <IntegrationsSlider />

      {/* CONTACT FORM */}
      <ContactForm />
    </div>
  );
}
