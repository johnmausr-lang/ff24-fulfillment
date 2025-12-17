"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1A0B2E] text-white selection:bg-[#D9FF00] selection:text-black">
      {/* Навигация */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-black italic uppercase tracking-tighter">
          FF24<span className="text-[#D9FF00]">.</span>LK
        </div>
        <Link href="/login">
          <Button variant="outline" className="border-[#D9FF00] text-[#D9FF00] hover:bg-[#D9FF00] hover:text-black transition-all rounded-full px-8">
            Войти
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[#D9FF00]/30 bg-[#D9FF00]/10 text-[#D9FF00] text-xs font-bold uppercase tracking-widest">
              Fulfillment 2.0
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.9] mb-8">
              Управляй <br />
              <span className="text-[#D9FF00]">бизнесом</span> <br />
              в один клик
            </h1>
            <p className="text-slate-400 text-lg max-w-md mb-10 font-medium">
              Личный кабинет FF24 — это полный контроль над вашими поставками, складом и заказами на маркетплейсах.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <Button className="bg-[#D9FF00] text-black hover:bg-white transition-all rounded-2xl px-10 py-7 text-lg font-black uppercase italic shadow-[0_0_30px_rgba(217,255,0,0.3)]">
                  Начать работу <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Визуальный элемент (Граточка-превью) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#D9FF00] blur-[120px] opacity-10 rounded-full" />
            <div className="relative bg-white/5 border border-white/10 p-8 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#D9FF00] flex items-center justify-center text-black">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <div className="text-sm text-slate-400 uppercase font-bold tracking-wider">Продажи сегодня</div>
                  <div className="text-2xl font-black italic uppercase">124,500 ₽</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-[#D9FF00]" />
                </div>
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-white/20" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-32">
          {[
            { icon: <Zap />, title: "Быстрая приемка", desc: "Обработка товара в день поступления на склад" },
            { icon: <ShieldCheck />, title: "Безопасность", desc: "Полная материальная ответственность за ваш сток" },
            { icon: <BarChart3 />, title: "Аналитика", desc: "Прозрачные отчеты по каждой единице товара" },
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-[#D9FF00]/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-[#D9FF00] group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black italic uppercase mb-2">{feature.title}</h3>
              <p className="text-slate-400 font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
