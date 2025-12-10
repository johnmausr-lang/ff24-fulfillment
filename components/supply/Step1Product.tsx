"use client";

import UploadBox from "./UploadBox";
import { useState } from "react";

export default function Step1Product({ data, onNext }) {
  const [local, setLocal] = useState(data);

  function update(field, value) {
    setLocal((p) => ({ ...p, [field]: value }));
  }

  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">

      <h2 className="text-xl text-white mb-6 font-semibold">Информация о товаре</h2>

      <div className="space-y-4">
        <div>
          <label className="text-white/70">Название товара</label>
          <input
            className="inputFF24"
            value={local.productName}
            onChange={(e) => update("productName", e.target.value)}
          />
        </div>

        <div>
          <label className="text-white/70">Артикул</label>
          <input
            className="inputFF24"
            value={local.article}
            onChange={(e) => update("article", e.target.value)}
          />
        </div>

        <div>
          <label className="text-white/70">Количество</label>
          <input
            type="number"
            className="inputFF24"
            value={local.qty}
            onChange={(e) => update("qty", e.target.value)}
          />
        </div>

        {/* ЗАГРУЗКА ИЗОБРАЖЕНИЯ */}
        <UploadBox
          image={local.imagePreview}
          onFile={(file, preview) => {
            update("image", file);
            update("imagePreview", preview);
          }}
        />
      </div>

      <button
        onClick={() => onNext(local)}
        className="btnFF24 mt-6"
      >
        Далее →
      </button>
    </div>
  );
}
