"use client";

import { useState } from "react";

interface Step1Data {
  name: string;
  article: string;
  description?: string;
  image?: File | null;
  imagePreview?: string | null;
}

interface Step1ProductProps {
  data: Step1Data;
  onNext: (updated: Step1Data) => void;
}

export default function Step1Product({ data, onNext }: Step1ProductProps) {
  const [local, setLocal] = useState<Step1Data>(data);

  function update(field: keyof Step1Data, value: any) {
    setLocal((prev) => ({ ...prev, [field]: value }));
  }

  function handleNext() {
    onNext(local);
  }

  return (
    <div className="space-y-6 max-w-xl">
      <h2 className="text-2xl font-bold">1. Основная информация</h2>

      <div className="space-y-2">
        <label className="text-sm opacity-70">Название товара</label>
        <input
          type="text"
          value={local.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          placeholder="Введите название"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm opacity-70">Артикул</label>
        <input
          type="text"
          value={local.article}
          onChange={(e) => update("article", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          placeholder="Введите артикул"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm opacity-70">Описание</label>
        <textarea
          value={local.description || ""}
          onChange={(e) => update("description", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 min-h-[120px]"
          placeholder="Опишите товар"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm opacity-70">Фото товара</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            update("image", file);

            if (file) {
              update("imagePreview", URL.createObjectURL(file));
            }
          }}
        />

        {local.imagePreview && (
          <img
            src={local.imagePreview}
            alt="preview"
            className="w-32 h-32 object-cover rounded-lg border border-white/10 mt-3"
          />
        )}
      </div>

      <button
        onClick={handleNext}
        className="px-6 py-3 bg-ff24-orange rounded-xl font-semibold text-black hover:opacity-80 transition"
      >
        Далее →
      </button>
    </div>
  );
}
