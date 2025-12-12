import FF24Scene from "@/components/3d/FF24Scene";

export default function HomePage() {
  return (
    <main className="ff24-root">
      {/* ================= HERO ================= */}
      <section className="ff24-hero">
        {/* 3D сцена */}
        <div className="ff24-hero-3d" aria-hidden="true">
          <FF24Scene />
          <div className="ff24-hero-3d-overlay" />
        </div>

        {/* Контент */}
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
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="ff24-section">
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
              Синхронизация остатков, заказов и приёмок
              в реальном времени.
            </p>
          </div>

          <div className="ff24-about-card">
            <h3>Премиальный сервис</h3>
            <p>
              Работаем не по объёму, а по качеству и ответственности.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACTS ================= */}
      <section className="ff24-section">
        <h2>Контакты</h2>

        <div className="ff24-contacts-box">
          <div>
            <strong>Email:</strong> support@ff24.ru
          </div>
          <div>
            <strong>Телефон:</strong> +7 (999) 000-00-00
          </div>
          <div>
            <strong>Адрес:</strong> Москва, складской кластер FF24
          </div>
        </div>
      </section>
    </main>
  );
}
