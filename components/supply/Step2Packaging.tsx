"use client";

import { useState } from "react";

export default function Step2Packaging({ data, onNext, onBack }) {
  const [local, setLocal] = useState(data);

  function update(field, value) {
    setLocal((p) => ({ ...p, [field]: value }));
  }

  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">

      <h2 className="text-xl text-white mb-6 font-semibold">Упаковка и работы</h2>

      <div className="space-y-4">
        <div>
          <label className="text-white/70">Тип упаковки</label>
          <select
            className="inputFF24"
            value={local.packaging}
            onChange={(e) => update("packaging", e.target.value)}
          >
            <option value="">Выберите</option>
            <option value="box">Коробка</option>
            <option value="bag">Пакет</option>
            <option value="ff24">Фирменная FF24</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-white/70">
          <input
            type="checkbox"
            checked={local.marking}
            onChange={(e) => update("marking", e.target.checked)}
          />
          Нужна маркировка
        </label>

        <div>
          <label className="text-white/70">Количество мест</label>
          <input
            type="number"
            className="inputFF24"
            value={local.places}
            onChange={(e) => update("places", e.target.value)}
          />
        </div>

        <div>
          <label className="text-white/70">Комментарий</label>
          <textarea
            className="inputFF24 h-24"
            value={local.comment}
            onChange={(e) => update("comment", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="btnFF24-secondary">
          ← Назад
        </button>

        <button onClick={() => onNext(local)} className="btnFF24">
          Далее →
        </button>
      </div>
    </div>
  );
}
