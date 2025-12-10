"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="ff24-home-wrapper">

      {/* ---------------------------- */}
      {/* 0 — GRID + MOVING LINES      */}
      {/* ---------------------------- */}
      <div className="ff24-hero-grid" />

      <div className="ff24-hero-lines">
        <div className="ff24-hero-line" />
        <div className="ff24-hero-line" />
        <div className="ff24-hero-line" />
      </div>

      {/* ---------------------------- */}
      {/* 1 — PARALLAX BACK WALL       */}
      {/* ---------------------------- */}
      <motion.div
        className="ff24-parallax-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
      />

      {/* ---------------------------- */}
      {/* 2 — FULL-BODY WORKER         */}
      {/* ---------------------------- */}
      <motion.div
        className="ff24-worker"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      >
        <Image
          src="/illustrations/worker-ff24.png"
          alt="FF24 Worker"
          width={760}
          height={760}
          priority
          className="ff24-worker-img"
        />
      </motion.div>

      {/* ---------------------------- */}
      {/* 3 — RIGHT CONTENT            */}
      {/* ---------------------------- */}
      <motion.div
        className="ff24-hero-content"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        {/* Логотип */}
        <Image
          src="/logo-ff24.png"
          alt="FF24 Logo"
          width={180}
          height={180}
          className="ff24-logo"
        />

        {/* Заголовок */}
        <h1 className="ff24-hero-title">
          Инновационный склад<br />
          <span className="ff24-title-accent">премиального уровня</span>
        </h1>

        {/* Подзаголовок */}
        <p className="ff24-hero-sub">
          Полный цикл фулфилмента: приёмка, хранение, упаковка, контроль остатков, интеграции.
          Технологичный сервис без компромиссов.
        </p>

        {/* CTA */}
        <div className="ff24-hero-buttons">
          <Link href="/login" className="ff24-btn-primary">
            Войти в личный кабинет
          </Link>

          <Link href="/#services" className="ff24-btn-secondary">
            Услуги FF24
          </Link>
        </div>

        {/* Маркетплейсы */}
        <div className="ff24-marketplace-row">
          <Image src="/wb.png" alt="Wildberries" width={70} height={70} />
          <Image src="/ozon.png" alt="Ozon" width={70} height={70} />
        </div>
      </motion.div>

    </main>
  );
}
