"use client";

import { useState } from "react";
import "./new-order.css";

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
  const [result, setResult] = useState<any>(null);

  const updatePos = (i: number, field: keyof typeof positions[0], value: any) => {
    const copy = [...positions];
    copy[i][field] = value;
    setPositions(copy);
  };

  const addPosition = () => {
    setPositions([
      ...positions,
      { name: "", vendorCode: "", color: "", size: "", quantity: 1, brand: "", photoUrl: "" },
    ]);
  };

  const removePosition = (i: number) => {
    if (positions.length === 1) return;
    setPositions(positions.filter((_, idx) => idx !== i));
  };

  const submit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ positions, comment }),
      });

      const data = await res.json();
      setResult(data);

      if (!data.ok) throw new Error(data.message);
    } catch (e: any) {
      console.error("Order create error", e);
      setResult({ ok: false, message: e.message });
    }

    setLoading(false);
  };

  return (
    <div className="new-order-page">
      <h1 className="title">Создать заказ</h1>

      <div className="positions-list">
        {positions.map((p, i) => (
          <div key={i} className="card position-card">
            <div className="position-header">
              <h2>Позиция {i + 1}</h2>
              <button className="remove-btn" onClick={() => removePosition(i)}>
                ✕
              </button>
            </div>

            <div className="fields-grid">
              <div>
                <label>Название товара *</label>
                <input
                  value={p.name}
                  onChange={(e) => updatePos(i, "name", e.target.value)}
                  placeholder="Пример: Кроссовки"
                />
              </div>

              <div>
                <label>Артикул *</label>
                <input
                  value={p.vendorCode}
                  onChange={(e) => updatePos(i, "vendorCode", e.target.value)}
                  placeholder="Пример: 123-ABC"
                />
              </div>

              <div>
                <label>Цвет *</label>
                <input
                  value={p.color}
                  onChange={(e) => updatePos(i, "color", e.target.value)}
                  placeholder="Красный"
                />
              </div>

              <div>
                <label>Размер *</label>
                <input
                  value={p.size}
                  onChange={(e) => updatePos(i, "size", e.target.value)}
                  placeholder="42"
                />
              </div>

              <div>
                <label>Количество *</label>
                <input
                  type="number"
                  min={1}
                  value={p.quantity}
                  onChange={(e) => updatePos(i, "quantity", Number(e.target.value))}
                />
              </div>

              <div>
                <label>Бренд *</label>
                <input
                  value={p.brand}
                  onChange={(e) => updatePos(i, "brand", e.target.value)}
                  placeholder="Nike"
                />
              </div>

              <div className="photo-block">
                <label>Фото URL</label>
                <input
                  value={p.photoUrl}
                  onChange={(e) => updatePos(i, "photoUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="add-btn" onClick={addPosition}>
        + Добавить позицию
      </button>

      <div className="card comment-card">
        <label>Комментарий к заказу</label>
        <textarea
          placeholder="Комментарий, пожелания, уточнения…"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <button className="submit-btn" onClick={submit} disabled={loading}>
        {loading ? "Создаём..." : "Создать заказ"}
      </button>

      {result && (
        <div className={`result-msg ${result.ok ? "ok" : "err"}`}>
          {result.ok ? "Заказ успешно создан!" : `Ошибка: ${result.message}`}
        </div>
      )}
    </div>
  );
}
