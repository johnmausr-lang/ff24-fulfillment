import HeroCanvas from "@/components/hero/HeroCanvas";

export default function HomePage() {
  return (
    <main style={{ height: "100vh", overflow: "hidden" }}>
      <HeroCanvas />

      {/* HTML поверх Canvas */}
      <section className="ff24-hero-overlay">
        <h1>
          Инфраструктура,
          <br />
          <span>на которую опирается бизнес</span>
        </h1>

        <p>
          Премиальный склад и фулфилмент FF24.
          Контроль, масштаб, интеграции.
        </p>

        <div className="actions">
          <a href="/login" className="btn-primary">
            Войти в систему
          </a>
          <a href="#about" className="btn-secondary">
            Как мы работаем
          </a>
        </div>
      </section>
    </main>
  );
}
