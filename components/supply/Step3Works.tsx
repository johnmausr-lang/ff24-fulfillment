"use client";

import { useState } from "react";

export default function Step3Works({ data, onChange, onNext, onBack }) {
  const servicesList = [
    { id: "accept", name: "Приёмка товара" },
    { id: "pack", name: "Упаковка" },
    { id: "label", name: "Маркировка" },
    { id: "print", name: "Печать бирки" },
    { id: "photo", name: "Фотофиксация" },
    { id: "sticker", name: "Стикер FF24" },
    { id: "sort", name: "Сортировка" },
    { id: "storage", name: "Хранение" }
  ];

  const [selected, setSelected] = useState(data.services || []);

  function toggle(serviceId) {
    const exists = selected.includes(serviceId);
    const updated = exists
      ? selected.filter((s) => s !== serviceId)
      : [...selected, serviceId];

    setSelected(updated);
    onChange({ ...data, services: updated });
  }

  return (
    <div className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border">

      <h2 className="text-3xl font-black text-[#21004B]">
        Шаг 3 — Выберите услуги
      </h2>

      <p className="text-gray-600">
        Отметьте, какие работы мы должны выполнить с товаром.
      </p>

      {/* Список услуг */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicesList.map((s) => (
          <label
            key={s.id}
            className="
              flex items-center gap-3 p-4 border rounded-xl bg-gray-50
              hover:bg-orange-50 cursor-pointer transition text-lg
            "
          >
            <input
              type="checkbox"
              checked={selected.includes(s.id)}
              onChange={() => toggle(s.id)}
              className="w-5 h-5"
            />
            {s.name}
          </label>
        ))}
      </div>

      {/* Навигация */}
      <div className="flex gap-6 pt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-gray-300 text-black font-bold"
        >
          ← Назад
        </button>

        <button
          onClick={onNext}
          className="
            px-6 py-3 rounded-xl bg-[#21004B] text-white font-bold 
            hover:opacity-90 transition
          "
        >
          Далее →
        </button>
      </div>
    </div>
  );
}
