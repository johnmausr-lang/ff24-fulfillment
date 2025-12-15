import HeroScene from "@/components/landing/HeroScene";
import LandingHero from "@/components/landing/LandingHero";

export default function HomePage() {
  return (
    <main className="ff24-root">
      {/* HERO */}
      <div style={{ position: "relative", height: "100vh" }}>
        <HeroScene />
        <LandingHero />
      </div>

      {/* BLOCK 2 — ПРЕИМУЩЕСТВА */}
      <section className="ff24-section ff24-about" id="how">
        <h2>Почему FF24</h2>

        <div className="ff24-about-grid">
          <div className="ff24-about-card">
            <h3>Enterprise SLA</h3>
            <p>Гарантированная стабильность и контроль.</p>
          </div>

          <div className="ff24-about-card">
            <h3>Интеграция</h3>
            <p>МойСклад, WB, Ozon, ERP.</p>
          </div>

          <div className="ff24-about-card">
            <h3>Масштаб</h3>
            <p>Готовы к росту без потери качества.</p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section className="ff24-section ff24-contacts">
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
