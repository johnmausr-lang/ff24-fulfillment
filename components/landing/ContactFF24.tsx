"use client";

export default function ContactFF24() {
  return (
    <section className="contact-section">
      <div className="contact-inner">

        <h2 className="contact-title">
          Готовы работать <span>по-взрослому</span>?
        </h2>

        <p className="contact-subtitle">
          FF24 — это не склад. Это инфраструктура для роста вашего бизнеса.
        </p>

        <div className="contact-grid">

          <div className="contact-card">
            <h3>Контакты</h3>
            <p>Email: <span>info@ff24.ru</span></p>
            <p>Поддержка: <span>24/7</span></p>
            <p>Формат: <span>B2B Fulfillment</span></p>
          </div>

          <div className="contact-card accent">
            <h3>Личный кабинет</h3>
            <p>
              Остатки, приёмки, аналитика и контроль — в реальном времени.
            </p>
            <a href="/login" className="contact-button">
              Войти в кабинет
            </a>
          </div>

        </div>

        <div className="contact-footer">
          © FF24 Fulfillment · Industrial logistics platform
        </div>

      </div>
    </section>
  );
}
