"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0B0B0B] text-white">

      {/* ---------------- HERO BACKGROUND LIGHTS ---------------- */}
      <div className="absolute inset-0">
        <div className="hero-light orange"></div>
        <div className="hero-light purple"></div>
      </div>

      {/* ---------------- 3D FLOATING BOXES ---------------- */}
      <FloatingBoxes />

      {/* ---------------- HERO CONTENT ---------------- */}
      <section className="relative z-20 w-full pt-32 pb-28 text-center flex flex-col items-center">
        
        {/* FF24 LOGO */}
        <Image
          src="/logo-ff24.png"
          alt="FF24 Logo"
          width={220}
          height={80}
          className="drop-shadow-[0_0_25px_rgba(255,120,0,0.45)] animate-logo-fade"
        />

        <h1 className="mt-12 text-5xl md:text-6xl font-bold tracking-tight leading-tight max-w-3xl animate-fade-up">
          Премиальная логистика для маркетплейсов
        </h1>

        <p className="mt-6 text-lg text-white/70 max-w-2xl animate-fade-up delay-150">
          Хранение, упаковка, сортировка, контроль остатков и приёмка — всё в одном современном
          личном кабинете FF24. Максимальная скорость + премиальный сервис.
        </p>

        <button
          onClick={() => (window.location.href = "/login")}
          className="
            mt-10 px-10 py-4 rounded-2xl text-lg font-semibold bg-gradient-to-r
            from-[#FF6B00] to-[#FF8C32]
            shadow-[0_0_25px_rgba(255,107,0,0.45)]
            hover:shadow-[0_0_40px_rgba(255,107,0,0.7)]
            hover:-translate-y-1 transition-all
            animate-fade-up delay-300
          "
        >
          Войти в кабинет
        </button>

        {/* Marketplace logos */}
        <MarketplaceStrip />
      </section>
    </main>
  );
}

/* ---------------------------------------------------------
 *  3D FLOATING BOXES
 * -------------------------------------------------------- */
function FloatingBoxes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="cube cube1"></div>
      <div className="cube cube2"></div>
      <div className="cube cube3"></div>
      <div className="cube cube4"></div>
    </div>
  );
}

/* ---------------------------------------------------------
 *  MARKETPLACE STRIP
 * -------------------------------------------------------- */
function MarketplaceStrip() {
  return (
    <div className="mt-20 opacity-80 animate-fade-up delay-500">
      <div className="text-sm text-white/40 mb-3">Работаем с маркетплейсами</div>

      <div className="flex items-center justify-center gap-10 opacity-70">
        {/* Ozon */}
        <Image
          src="/ozon.png"
          alt="Ozon"
          width={120}
          height={40}
          className="market-logo"
        />

        {/* Wildberries */}
        <Image
          src="/wb.png"
          alt="Wildberries"
          width={120}
          height={40}
          className="market-logo"
        />

        {/* FF24 brand */}
        <Image
          src="/f24-light.png"
          alt="FF24"
          width={120}
          height={40}
          className="market-logo"
        />
      </div>
    </div>
  );
}
