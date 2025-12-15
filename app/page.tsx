import HeroCanvas from "@/components/three/HeroCanvas";

export default function HomePage() {
  return (
    <main className="ff24-root">
      {/* 3D Canvas */}
      <HeroCanvas />

      {/* HERO */}
      <section
        id="hero"
        className="ff24-hero"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div className="ff24-hero-content">
          <h1 className="ff24-title">
            FF24 <span>Fulfillment</span>
          </h1>
          <p className="ff24-subtitle">
            Инфраструктура хранения, упаковки и логистики
            нового поколения
          </p>

          <div className="ff24-hero-actions">
            <a href="/login" className="ff24-btn-primary">
              Личный кабинет
            </a>
            <a href="#about" className="ff24-btn-secondary">
              Подробнее
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="ff24-section">
        <h2>О компании</h2>
        <p>
          FF24 — технологическая платформа складской логистики
          для e-commerce и брендов.
        </p>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="ff24-section">
        <h2>Преимущества</h2>
        <ul>
          <li>Масштабируемая инфраструктура</li>
          <li>Прозрачный контроль остатков</li>
          <li>Интеграция с МойСклад</li>
        </ul>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="ff24-section">
        <h2>Контакты</h2>
        <p>Email: info@ff24.ru</p>
        <p>Москва</p>
      </section>
    </main>
  );
}
