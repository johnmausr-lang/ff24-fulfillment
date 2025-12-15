import HeroCanvas from "@/components/hero/HeroCanvas";

export default function HomePage() {
  return (
    <main className="ff24-root">

      {/* ================= HERO ================= */}
      <section className="ff24-hero">
        {/* 3D сцена */}
        <HeroCanvas />

        {/* Контент */}
        <div className="ff24-hero-content">
          <h1 className="ff24-title">
            FF24 <span>FULFILLMENT</span>
          </h1>

          <p className="ff24-subtitle">
            Премиальный фулфилмент полного цикла.
            Хранение, упаковка, логистика —
            под контролем 24/7.
          </p>

          <div className="ff24-hero-actions">
            <a href="/login" className="ff24-btn-primary">
              Личный кабинет
            </a>

            <a href="#about" className="ff24-btn-secondary">
              О компании
            </a>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="ff24-section ff24-about">
        <h2>Почему выбирают FF24</h2>

        <div className="ff24-about-grid">
          <div className="ff24-about-card">
            <h3>Индустриальный контроль</h3>
            <p>
              Современные склады, строгие процессы,
              полная прозрачность операций.
            </p>
          </div>

          <div className="ff24-about-card">
            <h3>Интеграция с МоимСкладом</h3>
            <p>
              Остатки, приёмки, заказы и отчёты
              в реальном времени.
            </p>
          </div>

          <div className="ff24-about-card">
            <h3>Безопасность и масштаб</h3>
            <p>
              От старта до объёма —
              инфраструктура готова к росту.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACTS ================= */}
      <section className="ff24-section ff24-contacts">
        <h2>Контакты</h2>

        <div className="ff24-contacts-box">
          <div>Email: support@ff24.ru</div>
          <div>Телефон: +7 (000) 000-00-00</div>
          <div>Москва · Россия</div>
        </div>
      </section>

    </main>
  );
}
