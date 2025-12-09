"use client";

import { useState } from "react";
import Image from "next/image";

export default function Step1Product({ data, onChange, onNext }) {
  const [preview, setPreview] = useState(null);

  function handleChange(field, value) {
    onChange({ ...data, [field]: value });
  }

  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    handleChange("image", file);
    setPreview(URL.createObjectURL(file));
  }

  const isReady =
    data.brand?.length > 0 &&
    data.model?.length > 0 &&
    data.color?.length > 0;

  return (
    <div className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border">

      <h2 className="text-3xl font-black text-[#21004B]">
        Шаг 1 — Информация о товаре
      </h2>

      <div className="space-y-6">

        {/* Бренд */}
        <div>
          <label className="text-lg font-semibold">Бренд</label>
          <input
            type="text"
            value={data.brand || ""}
            onChange={(e) => handleChange("brand", e.target.value)}
            className="w-full p-4 border rounded-xl bg-gray-50 mt-2"
            placeholder="Например: Nike"
          />
        </div>

        {/* Модель */}
        <div>
          <label className="text-lg font-semibold">Модель / Название</label>
          <input
            type="text"
            value={data.model || ""}
            onChange={(e) => handleChange("model", e.target.value)}
            className="w-full p-4 border rounded-xl bg-gray-50 mt-2"
            placeholder="Например: Air Max 270"
          />
        </div>

        {/* Цвет */}
        <div>
          <label className="text-lg font-semibold">Цвет</label>
          <input
            type="text"
            value={data.color || ""}
            onChange={(e) => handleChange("color", e.target.value)}
            className="w-full p-4 border rounded-xl bg-gray-50 mt-2"
            placeholder="Например: Red"
          />
        </div>

        {/* Описание */}
        <div>
          <label className="text-lg font-semibold">Описание (опционально)</label>
          <textarea
            value={data.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full p-4 border rounded-xl bg-gray-50 mt-2 min-h-[120px]"
            placeholder="Введите описание товара"
          />
        </div>

        {/* Фото */}
        <div>
          <label className="text-lg font-semibold">Фото товара</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="mt-2"
          />

          {preview && (
            <Image
              src={preview}
              alt="preview"
              width={200}
              height={200}
              className="rounded-xl mt-4 border shadow"
            />
          )}
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isReady}
        className={`
          w-full py-4 rounded-xl text-2xl font-bold text-white transition
          ${isReady
            ? "bg-gradient-to-r from-[#21004B] to-[#4B2C82] hover:opacity-90"
            : "bg-gray-400 cursor-not-allowed"
          }
        `}
      >
        Далее →
      </button>

    </div>
  );
}
