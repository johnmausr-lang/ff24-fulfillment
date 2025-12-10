"use client";

import { useState } from "react";

export default function Step3Confirm({ data, onBack }) {
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);

    const res = await fetch("/api/supply/create", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setLoading(false);

    if (result.success) {
      alert("Поставка создана!");
      window.location.href = "/dashboard";
    } else {
      alert("Ошибка: " + result.error);
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">
      <h2 className="text-xl text-white mb-6 font-semibold">Подтверждение</h2>

      <div className="space-y-2 text-white/80">
        <p><b>Товар:</b> {data.productName}</p>
        <p><b>Артикул:</b> {data.article}</p>
        <p><b>Количество:</b> {data.qty}</p>
        <p><b>Упаковка:</b> {data.packaging}</p>
        <p><b>Места:</b> {data.places}</p>
        <p><b>Маркировка:</b> {data.marking ? "Да" : "Нет"}</p>
        {data.comment && <p><b>Комментарий:</b> {data.comment}</p>}
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="btnFF24-secondary">
          ← Назад
        </button>

        <button onClick={submit} className="btnFF24">
          {loading ? "Отправка..." : "Создать поставку →"}
        </button>
      </div>
    </div>
  );
}
