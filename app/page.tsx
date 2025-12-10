// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="ff24-home-wrapper">

      {/* --- HERO LAYER 0: НЕОН-ЛИНИИ / ГРИД --- */}
      <div className="ff24-hero-grid" />
      <div className="ff24-hero-lines">
        <div className="ff24-hero-line" />
        <div className="ff24-hero-line" />
        <div className="ff24-hero-line" />
      </div>

      {/* --- HERO LAYER 1: ПАРАЛЛАКС ФОН --- */}
      <motion.div
        className="ff24-parallax-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.6 }}
      />

      {/* --- HERO LAYER 2: FULL BODY WORKER --- */}
      <motion.div
        className="ff24-worker"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <Image
          src="/hero/worker-premium.png"
          alt="FF24 Worker"
          width={760}
          height={760}
          priority
          className="ff24-worker-img"
        />
      </motion.div>

      {/* --- HERO LAYER 3: RIGHT SIDE CONTENT --- */}
      <motion.div
        className="ff24-hero-content"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <Image
          src="/logo-ff24.png"
          alt="FF24 Logo"
          width={180}
          height={180}
          className="ff24-logo"
        />

        <h1 className="ff24-hero-title">
          <span>Складская логистика</span><br />
          <span className="ff24-title-accent">на премиальном уровне</span>
        </h1>

        <p className="ff24-hero-sub">
          Полный цикл фулфилмента: хранение, упаковка, учёт, интеграции.
          Мгновенное обслуживание. Мощная автоматизация.
        </p>

        <div className="ff24-hero-buttons">
          <Link href="/login" className="ff24-btn-primary">
            Войти в личный кабинет
          </Link>

          <Link href="/#services" className="ff24-btn-secondary">
            Наши услуги
          </Link>
        </div>

        <div className="ff24-marketplace-row">
          <Image src="/wb.png" alt="WB" width={70} height={70} />
          <Image src="/ozon.png" alt="Ozon" width={70} height={70} />
        </div>
      </motion.div>

    </main>
  );
}
