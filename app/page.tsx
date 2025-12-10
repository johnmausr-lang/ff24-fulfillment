"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/* -----------------------------------------------------------
   Premium Scene Parallax Handler
----------------------------------------------------------- */
function useParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handle = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return ref;
}

/* -----------------------------------------------------------
   Главная страница FF24 Premium V1
----------------------------------------------------------- */
export default function HomePage() {
  const heroRef = useParallax();

  return (
    <main className="relative min-h-screen bg-[#0A0A0A] overflow-hidden text-white">

      {/* Noise Layer */}
      <div className="pointer-events-none fixed inset-0 z-[5] bg-[url('/noise.png')] opacity-[0.08]" />

      {/* Soft Ambient Lights */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#ff7a1a33] blur-[160px] rounded-full" />
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#ff480033] blur-[180px] rounded-full" />

      {/* ---------------------- HERO ----------------------- */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          ref={heroRef}
          className="relative z-20 text-center select-none"
        >
          <h1 className="
            text-7xl md:text-9xl font-black 
            tracking-tight leading-none
            drop-shadow-[0_0_20px_rgba(255,120,20,0.35)]
          ">
            FF24 FULFILLMENT
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
            Современный премиальный фулфилмент для брендов нового поколения.
          </p>

          {/* CTA */}
          <button
            onClick={() => (window.location.href = "/login")}
            className="
              premium-btn mt-10 px-10 py-4 rounded-xl text-lg font-semibold 
              bg-gradient-to-r from-[#FF6B00] to-[#FF8C32]
              shadow-[0_0_28px_rgba(255,110,10,0.55)]
              hover:shadow-[0_0_38px_rgba(255,110,10,0.75)]
              hover:-translate-y-1 transition-all
            "
          >
            Войти в личный кабинет
          </button>
        </div>

        {/* Worker 3D Scene */}
        <Image
          src="/illustrations/worker-ff24.png"
          alt="FF24 Worker"
          width={620}
          height={620}
          className="
            absolute bottom-0 left-1/2 -translate-x-1/2 md:left-[10%] md:translate-x-0
            z-10 pointer-events-none
            drop-shadow-[0_0_45px_rgba(255,110,10,0.55)]
            animate-premium-float
          "
        />

        {/* Depth Boxes */}
        <div className="box-layer box-depth-1" />
        <div className="box-layer box-depth-2" />
        <div className="box-layer box-depth-3" />
      </section>

      {/* ---------------- Premium Blocks Section ---------------- */}
      <section className="relative z-30 py-32 container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-20">
          Почему FF24 — выбор премиальных брендов?
        </h2>

        <div className="grid md:grid-cols-3 gap-16">
          <Feature
            title="Премиальная скорость"
            text="Упаковка и отправка в день поступления. Без очередей. Без задержек."
          />
          <Feature
            title="Идеальная точность"
            text="Контроль на каждом этапе. WMS-система уровня enterprise."
          />
          <Feature
            title="Сильная инфраструктура"
            text="Мощные процессы с интеграцией в маркетплейсы и API."
          />
        </div>
      </section>
    </main>
  );
}

/* -----------------------------------------------------------
   Feature Block
----------------------------------------------------------- */
function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="
        p-10 rounded-3xl border border-white/10 
        bg-white/[0.03] backdrop-blur-xl
        shadow-[0_0_30px_rgba(255,110,10,0.15)]
        hover:shadow-[0_0_45px_rgba(255,110,10,0.35)]
        hover:-translate-y-1 transition-all
      "
    >
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}
