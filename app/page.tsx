import HeroCanvas from "@/components/hero/HeroCanvas";

export default function HomePage() {
  return (
    <main className="ff24-root">
      {/* 3D фон */}
      <HeroCanvas />

      {/* HERO */}
      <section
        className="ff24-hero"
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
        }}
      >
        <div className="ff24-hero-content">
          <h1 className="ff24-title">
            Инфраструктура,
            <br />
            <span>на которую</span>
            <br />
            опирается бизнес
          </h1>

          <p className="ff24-subtitle">
            FF24 — премиальный склад и фулфилмент.
            Контроль, масштаб, прозрачность и интеграции
            без компромиссов.
          </p>

          <div className="ff24-hero-actions">
            <a href="/login" className="ff24-btn-primary">
              Войти в систему
            </a>
            <a href="#about" className="ff24-btn-secondary">
              Как мы работаем
            </a>
          </div>
        </div>

        <div className="ff24-hero-glow" />
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="ff24-section ff24-about"
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
        }}
      >
        <h2>О компании</h2>

        <div className="ff24-about-grid">
          <div className="ff24-about-card">
            <h3>Инфраструктура</h3>
            <p>
              Более 10 000 м² складских площадей,
              промышленное хранение, контроль доступа
              и видеофиксация.
            </p>
          </div>

          <div className="ff24-about-card">
            <h3>Технологии</h3>
            <p>
              Интеграция с МойСклад, прозрачные остатки,
              API, автоматизация процессов.
            </p>
          </div>

          <div className="ff24-about-card">
            <h3>SLA</h3>
            <p>
              Enterprise-подход, регламенты,
              ответственность и масштабируемость.
            </p>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section
        className="ff24-section"
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
        }}
      >
        <h2>Почему FF24</h2>

        <div className="ff24-about-grid">
          <div className="ff24-about-card">
            <h3>Контроль</h3>
            <p>Каждая единица товара под контролем.</p>
          </div>

          <div className="ff24-about-card">
            <h3>Масштаб</h3>
            <p>Готовность к росту без переделки процессов.</p>
          </div>

          <div className="ff24-about-card">
            <h3>Скорость</h3>
            <p>Приёмка, хранение и отгрузка без задержек.</p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section
        className="ff24-section ff24-contacts"
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
        }}
      >
        <h2>Контакты</h2>

        <div className="ff24-contacts-box">
          <div>📍 Москва</div>
          <div>✉️ info@ff24.ru</div>
          <div>📞 +7 (000) 000-00-00</div>
        </div>
      </section>
    </main>
  );
}
