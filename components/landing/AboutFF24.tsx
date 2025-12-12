"use client";

import { useEffect, useRef } from "react";

export default function AboutFF24() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onScroll() {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const visible = rect.top < window.innerHeight * 0.8;

      if (visible) {
        el.classList.add("about-visible");
      }
    }

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="about-premium">
      <div className="about-container">
        <h2 className="about-title">
          Мы создаём <span>новый стандарт</span> фулфилмента
        </h2>

        <p className="about-text">
          FF24 — технологичная экосистема для бизнеса, где каждый процесс склада
          автоматизирован, прозрачен и измерим. Мы объединяем премиальный сервис,
          цифровую безопасность и точность исполнения 24/7.
        </p>

        <p className="about-text">
          Наши алгоритмы распределения, отслеживание маршрутов, прогнозирование
          объёмов и автоматизация упаковки создают уникальную скорость обработки
          заказов.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <h3>5 000+</h3>
            <p>коробок ежедневно проходят через систему FF24</p>
          </div>

          <div className="about-card">
            <h3>99.97%</h3>
            <p>точность комплектации заказов</p>
          </div>

          <div className="about-card">
            <h3>50 000 м²</h3>
            <p>высокотехнологичных складских мощностей</p>
          </div>

          <div className="about-card">
            <h3>24/7</h3>
            <p>полная операционная активность</p>
          </div>
        </div>
      </div>
    </section>
  );
}
