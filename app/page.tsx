import Image from "next/image";
import ScrollScene from "@/components/landing/ScrollScene";

export default function HomePage() {
  return (
    <main className="ff24-root">
      {/* ================= HERO ================= */}
      <section className="ff24-hero">
        <div className="ff24-hero-content">
          <h1 className="ff24-title">
            FF24 <span>FULFILLMENT</span>
          </h1>

          <p className="ff24-subtitle">
            Премиальный склад и фулфилмент
            <br />
            для маркетплейсов нового поколения
          </p>

          <div className="ff24-hero-actions">
            <a href="/login" className="ff24-btn-primary">
              Войти в личный кабинет
            </a>
            <a href="#about" className="ff24-btn-secondary">
              О компании
            </a>
          </div>
        </div>

        {/* Фоновое свечение */}
        <div className="ff24-hero-glow" />
      </section>

      {/* ================= SCROLL SCENE (BLOCK 4) ================= */}
      <ScrollScene />

      {/* ================= ABOUT ================= */}
      <section id="about" className="ff24-section ff24-about">
        <h2>Почему FF24</h2>

        <div className="ff24-about-grid">
          <div className="ff24-about-card">
            <h3>Индустриальный стандарт</h3>
            <p>
              Современные склады, автоматизация процессов,
              контроль каждой единицы товара.
            </p>
          </div>

          <div className="ff24-about-card">
            <h3>Интеграция с МойСклад</h3>
            <p>
              Прямая синхронизация остатков, заказов
              и приёмок в реальном времени.
            </p>
          </div>

          <div className="ff24-about-card">
            <h3>Премиум-подход</h3>
            <p>
              Мы работаем не «по количеству»,
              а по качеству и ответственности.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACTS ================= */}
      <section className="ff24-section ff24-contacts">
        <h2>Контакты</h2>

        <div className="ff24-contacts-box">
          <div>
            <strong>Email:</strong>
            <span> support@ff24.ru</span>
          </div>
          <div>
            <strong>Телефон:</strong>
            <span> +7 (999) 000-00-00</span>
          </div>
          <div>
            <strong>Адрес:</strong>
            <span> Москва, складской кластер FF24</span>
          </div>
        </div>
      </section>
    </main>
  );
}
