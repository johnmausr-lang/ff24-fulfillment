"use client";

import { useState } from "react";

export default function Step2Sizes({ data, onChange, onNext, onBack }) {
  const [list, setList] = useState(data.sizes || []);

  function update(index, field, value) {
    const updated = [...list];
    updated[index][field] = value;
    setList(updated);
    onChange({ ...data, sizes: updated });
  }

  function addSize() {
    const updated = [...list, { size: "", quantity: 1, barcode: "" }];
    setList(updated);
    onChange({ ...data, sizes: updated });
  }

  function remove(i) {
    const updated = list.filter((_, idx) => idx !== i);
    setList(updated);
    onChange({ ...data, sizes: updated });
  }

  const ready = list.length > 0 && list.every((i) => i.size && i.quantity > 0);

  return (
    <div className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border">

      <h2 className="text-3xl font-black text-[#21004B]">
        Шаг 2 — Размеры и количество
      </h2>

      <p className="text-gray-600">
        Добавьте все размеры, которые входят в поставку. 
        Вы можете ввести любые значения: 42, 44, S, L, Custom и т.д.
      </p>

      {/* Кнопка добавления размера */}
      <button
        onClick={addSize}
        className="
          px-6 py-3 rounded-xl bg-[#21004B] text-white font-bold
          hover:opacity-90 transition
        "
      >
        + Добавить размер
      </button>

      {/* Список размеров */}
      <div className="space-y-6">
        {list.map((row, i) => (
          <div
            key={i}
            className="p-6 border rounded-xl bg-gray-50 shadow-sm relative"
          >
            <button
              onClick={() => remove(i)}
              className="absolute right-4 top-4 text-red-600 text-xl"
            >
              ✕
            </button>

            {/* Размер */}
            <div className="mb-4">
              <label className="font-semibold">Размер</label>
              <input
                type="text"
                value={row.size}
                placeholder="Например: 42"
                onChange={(e) => update(i, "size", e.target.value)}
                className="w-full p-3 mt-1 bg-white border rounded-xl"
              />
            </div>

            {/* Количество */}
            <div className="mb-4">
              <label className="font-semibold">Количество</label>
              <input
                type="number"
                value={row.quantity}
                min={1}
                onChange={(e) => update(i, "quantity", Number(e.target.value))}
                className="w-full p-3 mt-1 bg-white border rounded-xl"
              />
            </div>

            {/* Штрихкод */}
            <div>
              <label className="font-semibold">Штрихкод (опционально)</label>
              <input
                type="text"
                value={row.barcode}
                onChange={(e) => update(i, "barcode", e.target.value)}
                placeholder="Введите штрихкод"
                className="w-full p-3 mt-1 bg-white border rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Навигация */}
      <div className="flex gap-6 pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-gray-300 text-black font-bold"
        >
          ← Назад
        </button>

        <button
          onClick={onNext}
          disabled={!ready}
          className={`
            px-6 py-3 rounded-xl text-white font-bold 
            ${ready ? "bg-[#21004B] hover:opacity-90" : "bg-gray-400 cursor-not-allowed"}
          `}
        >
          Далее →
        </button>
      </div>
    </div>
  );
}
