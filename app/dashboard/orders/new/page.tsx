"use client";

import { useState } from "react";
import "./orders-new.css";

export default function NewOrderPage() {
  const [positions, setPositions] = useState([
    {
      name: "",
      vendorCode: "",
      color: "",
      size: "",
      quantity: 1,
      brand: "",
      photoUrl: "",
    },
  ]);

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // ------------------------------
  // Добавить позицию
  // ------------------------------
  const addPosition = () => {
    setPositions([
      ...positions,
      {
        name: "",
        vendorCode: "",
        color: "",
        size: "",
        quantity: 1,
        brand: "",
        photoUrl: "",
      },
    ]);
  };

  // ------------------------------
  // Удалить позицию
  // ------------------------------
  const removePosition = (i: number) => {
    if (positions.length === 1) return;
    setPositions(positions.filter((_, idx) => idx !== i));
  };

  // ------------------------------
  // Обновить поле
  // ------------------------------
  const update = (i: number, key: keyof typeof positions[0], value: any) => {
    const list = [...positions];
    list[i][key] = value;
    setPositions(list);
  };

  // ------------------------------
  // Отправка формы
  // ------------------------------
  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          positions,
          comment,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        alert("Ошибка: " + data.message);
      } else {
        alert("Заказ успешно создан!");
        window.location.href = "/dashboard/orders";
      }
    } catch (err) {
      alert("Ошибка запроса");
    }

    setLoading(false);
  };

  return (
    <div className="page-content">

      <div className="card" style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 30, marginBottom: 5 }}>Создание заказа 📝</h1>
        <p style={{ opacity: 0.7 }}>
          Заполните данные ниже и отправьте заказ в обработку.
        </p>
      </div>

      <form className="card order-form" onSubmit={submit}>

        {/* ============================
            Позиции заказа
        ============================ */}
        <h2 className="block-title">Позиции товара</h2>

        {positions.map((p, i) => (
          <div className="position-block" key={i}>
            <div className="position-header">
              <strong>Позиция #{i + 1}</strong>
              {positions.length > 1 && (
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => removePosition(i)}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="grid">
              <div className="field">
                <label>Название товара</label>
                <input
                  value={p.name}
                  onChange={(e) => update(i, "name", e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Артикул</label>
                <input
                  value={p.vendorCode}
                  onChange={(e) => update(i, "vendorCode", e.target.value)}
                />
              </div>

              <div className="field">
                <label>Цвет</label>
                <input
                  value={p.color}
                  onChange={(e) => update(i, "color", e.target.value)}
                />
              </div>

              <div className="field">
                <label>Размер</label>
                <input
                  value={p.size}
                  onChange={(e) => update(i, "size", e.target.value)}
                />
              </div>

              <div className="field">
                <label>Количество</label>
                <input
                  type="number"
                  min={1}
                  value={p.quantity}
                  onChange={(e) => update(i, "quantity", Number(e.target.value))}
                />
              </div>

              <div className="field">
                <label>Бренд</label>
                <input
                  value={p.brand}
                  onChange={(e) => update(i, "brand", e.target.value)}
                />
              </div>

              <div className="field">
                <label>Фото товара (URL)</label>
                <input
                  value={p.photoUrl}
                  onChange={(e) => update(i, "photoUrl", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        <button type="button" className="btn-secondary" onClick={addPosition}>
          + Добавить позицию
        </button>

        {/* ============================
            Комментарий
        ============================ */}
        <h2 className="block-title" style={{ marginTop: 25 }}>
          Инструкции к заказу
        </h2>

        <textarea
          className="comment-box"
          placeholder="Например: бережная упаковка, проверить размеры..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="btn-primary" disabled={loading}>
          {loading ? "Создание..." : "Отправить заказ"}
        </button>

      </form>
    </div>
  );
}
