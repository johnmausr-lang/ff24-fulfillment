"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";

type ParallaxState = {
  x: number;
  y: number;
};

export default function HomePage() {
  const [parallax, setParallax] = useState<ParallaxState>({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setParallax({ x, y });
    };

    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const workerStyle: CSSProperties = {
    transform: `translate3d(${parallax.x * 2}px, ${parallax.y * 2}px, 0)`,
  };

  const panelStyle: CSSProperties = {
    transform: `rotateX(${parallax.y * -0.6}deg) rotateY(${parallax.x * 0.6}deg)`,
    transformStyle: "preserve-3d",
  };

  function goToLogin() {
    window.location.href = "/login";
  }

  return (
    <main className="ff24-page">
      {/* Фоновые элементы */}
      <div className="ff24-hero-grid" />
      <div className="ff24-hero-lines">
        <div className="ff24-hero-line" />
        <div className="ff24-hero-line" />
        <div className="ff24-hero-line" />
      </div>

      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-24 pb-20 md:pt-28 md:pb-28 flex flex-col md:flex-row items-center gap-16 md:gap-20">
        {/* LEFT: HERO WORKER */}
        <div
          className="ff24-hero-worker-wrap ff24-fade-up"
          style={workerStyle}
        >
          <div className="ff24-hero-worker-glow" />
          <Image
            src="/illustrations/worker-ff24.png" // сюда просто положи новый full-body файл
            alt="FF24 грузчик на складе"
            width={520}
            height={720}
            priority
            className="ff24-hero-worker-img"
          />
        </div>

        {/* RIGHT: CONTENT PANEL */}
        <div
          className="ff24-hero-panel ff24-fade-up"
          style={panelStyle}
        >
          <div className="ff24-badge mb-5">
            <span>FF24 · ФУЛФИЛМЕНТ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
            Премиальный фулфилмент
            <br />
            для маркетплейсов{" "}
            <span className="text-[var(--ff24-acid)]">России</span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--ff24-text-dim)] max-w-xl mb-8">
            FF24 берёт на себя приёмку, хранение, упаковку и отправку товаров
            на склады Wildberries, Ozon и других маркетплейсов. Прозрачная
            аналитика, контроль остатков и доставка «под ключ».
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button className="ff24-btn-primary" onClick={goToLogin}>
              <span>Войти в личный кабинет</span>
            </button>

            <button className="ff24-btn-secondary">
              <span>Рассчитать стоимость</span>
            </button>
          </div>

          {/* Logos strip */}
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--ff24-text-dim)]">
              Работаем с маркетплейсами
            </div>
            <div className="ff24-logos-strip">
              <div className="ff24-logo-pill">
                <Image
                  src="/wb.png"
                  alt="Wildberries"
                  width={70}
                  height={24}
                />
              </div>
              <div className="ff24-logo-pill">
                <Image src="/ozon.png" alt="Ozon" width={70} height={24} />
              </div>
              <div className="ff24-logo-pill">
                <Image
                  src="/f24-light.png"
                  alt="FF24"
                  width={70}
                  height={24}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
