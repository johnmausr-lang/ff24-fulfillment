"use client";

export default function LandingHero() {
  return (
    <section className="ff24-hero">
      <div className="ff24-hero-content">
        <h1 className="ff24-title">
          Инфраструктура,
          <br />
          <span>на которую</span>
          <br />
          опирается бизнес
        </h1>

        <p className="ff24-subtitle">
          Премиальный фулфилмент FF24 —
          контроль, масштаб и прозрачность
          на каждом этапе логистики.
        </p>

        <div className="ff24-hero-actions">
          <a href="/login" className="ff24-btn-primary">
            Войти в систему
          </a>
          <a href="#how" className="ff24-btn-secondary">
            Как мы работаем
          </a>
        </div>
      </div>

      <div className="ff24-hero-glow" />
    </section>
  );
}
