"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handler = () => setScroll(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section className="hero-premium relative min-h-screen w-full overflow-hidden">
      
      {/* ==== Parallax layers ==== */}
      <div 
        className="layer-boxes" 
        style={{ transform: `translateY(${scroll * 0.15}px)` }}
      />

      <div 
        className="layer-shelves" 
        style={{ transform: `translateY(${scroll * 0.25}px)` }}
      />

      <div 
        className="layer-lights" 
        style={{ transform: `translateY(${scroll * 0.1}px)` }}
      />

      {/* Logo + Text */}
      <div className="hero-content">
        <Image 
          src="/logo-ff24.png"
          alt="FF24"
          width={260}
          height={120}
          className="logo-premium"
        />

        <h1 className="hero-title">
          Инновационный склад <br />
          <span>премиального уровня</span>
        </h1>

        <p className="hero-sub">
          Полный цикл фулфилмента: приёмка, хранение, упаковка, 
          контроль остатков, интеграции. Технологичный сервис без компромиссов.
        </p>

        <div className="hero-buttons">
          <a className="btn-primary" href="/login">Войти в кабинет</a>
          <a className="btn-secondary" href="/services">Услуги FF24</a>
        </div>
      </div>
    </section>
  );
}
