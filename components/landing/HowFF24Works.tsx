"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    title: "Приёмка товара",
    text: "Мы принимаем и фиксируем каждую поставку: фото, проверка, маркировка, контроль."
  },
  {
    title: "Хранение",
    text: "Оптимальное размещение на складе с учётом скорости оборота и безопасности."
  },
  {
    title: "Обработка",
    text: "Упаковка, комплектация, переупаковка и дополнительные услуги."
  },
  {
    title: "Контроль и аналитика",
    text: "Вы видите остатки, движение и статус в личном кабинете в реальном времени."
  },
];

export default function HowFF24Works() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onScroll() {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.75) {
        el.classList.add("works-visible");
      }
    }

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="works-section">
      <div className="works-container">

        <h2 className="works-title">
          Как работает <span>FF24</span>
        </h2>

        <div className="works-track">
          <div className="works-line" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="works-step"
              style={{ transitionDelay: `${i * 180}ms` }}
            >
              <div className="works-dot" />
              <div className="works-content">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
