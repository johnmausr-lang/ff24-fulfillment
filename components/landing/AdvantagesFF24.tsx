"use client";

import { useEffect, useRef } from "react";

const advantages = [
  {
    title: "Технологический склад",
    text: "Полная автоматизация приёмки, хранения и обработки товаров. Минимум человеческого фактора.",
  },
  {
    title: "Интеграции 24/7",
    text: "Мгновенная синхронизация с маркетплейсами, ERP и CRM. Данные обновляются в реальном времени.",
  },
  {
    title: "Премиальный контроль",
    text: "Отслеживание каждой коробки, фотофиксация, аналитика остатков и движения.",
  },
  {
    title: "Скорость исполнения",
    text: "Приёмка и обработка заказов без задержек — даже при пиковых нагрузках.",
  },
  {
    title: "Безопасность",
    text: "Контроль доступа, видеонаблюдение, цифровые журналы операций.",
  },
  {
    title: "Масштабируемость",
    text: "FF24 растёт вместе с вашим бизнесом — без ограничений по объёму.",
  },
];

export default function AdvantagesFF24() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onScroll() {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        el.classList.add("advantages-visible");
      }
    }

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="advantages-section">
      <div className="advantages-container">
        <h2 className="advantages-title">
          Почему <span>FF24</span>
        </h2>

        <div className="advantages-grid">
          {advantages.map((item, i) => (
            <div
              key={i}
              className="adv-card"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="adv-glow" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
