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
            Инфраструктура,
            <br />
            <span>на которую опирается ваш бизнес</span>
          </h1>

          <p className="ff24-subtitle">
            Премиальный склад и фулфилмент FF24 —
            <br />
            контроль, масштаб и прозрачность
            <br />
            на каждом этапе логистики.
          </p>

          <div className="ff24-hero-actions">
            <a href="/login" className="ff24-btn-primary">
              Войти в систему
            </a>
            <a href="#about" className="ff24-btn-secondary">
              Как мы работаем
            </a>
          </div>

          <p
            style={{
              marginTop: 24,
              color: "#777",
              fontSize: 14,
            }}
          >
            Более 10 000 м² складской инфраструктуры ·
            Интеграция с МойСклад · Enterprise SLA
          </p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="ff24-section">
        <h2>Как это работает</h2>

        <div className="ff24-about-grid">
          <div className="ff24-about-card">
            <h3>Приёмка и контроль</h3>
            <p>
              Каждая поставка проходит проверку,
              маркировку и фиксацию в системе.
            </p>
          </div>

          <div className="ff24-about-card">
            <h3>Хранение и учёт</h3>
            <p>
              Прозрачные остатки, партии и движения
              в режиме реального времени.
            </p>
          </div>

          <div className="ff24-about-card">
            <h3>Интеграция и отчёты</h3>
            <p>
              Полная синхронизация с МойСклад
              и аналитика для принятия решений.
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
