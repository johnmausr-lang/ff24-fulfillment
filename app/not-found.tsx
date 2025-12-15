export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#eaeaea",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <div>
        <h1 style={{ fontSize: "64px", marginBottom: "16px" }}>
          404
        </h1>
        <p style={{ opacity: 0.7, marginBottom: "32px" }}>
          Страница не найдена
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "14px 24px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #ffeb3b, #ffe066)",
            color: "#000",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          На главную
        </a>
      </div>
    </div>
  );
}
