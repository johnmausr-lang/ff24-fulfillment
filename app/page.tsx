import HeroCanvas from "@/components/hero/HeroCanvas";

export default function HomePage() {
  return (
    <main style={{ minHeight: "300vh" }}>
      <HeroCanvas />

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "0 8vw",
        }}
      >
        <h1 style={{ fontSize: 64, maxWidth: 700 }}>
          Инфраструктура,
          <br />
          на которую опирается ваш бизнес
        </h1>
      </section>
    </main>
  );
}
