"use client";

import Image from "next/image";

// Простая SKU-функция (точно как в Python utils -> slugify)
function makeSKU(brand, model, color, size) {
  return [brand, model, color, size]
    .join("-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toUpperCase();
}

export default function Step4Preview({ data, onNext, onBack }) {
  const product = data;

  return (
    <div className="space-y-10 bg-white p-8 rounded-2xl shadow-xl border">

      {/* Заголовок */}
      <h2 className="text-3xl font-black text-[#21004B]">
        Шаг 4 — Предпросмотр поставки
      </h2>

      <p className="text-gray-600">
        Проверьте все данные перед созданием поставки.
      </p>

      {/* Блок товара */}
      <div className="p-6 border rounded-2xl bg-gray-50 shadow-sm">
        <h3 className="text-2xl font-bold mb-4 text-[#21004B]">Товар</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Информация */}
          <div className="space-y-3 text-lg">
            <p><b>Бренд:</b> {product.brand}</p>
            <p><b>Модель:</b> {product.model}</p>
            <p><b>Цвет:</b> {product.color}</p>

            {product.description && (
              <p><b>Описание:</b> {product.description}</p>
            )}
          </div>

          {/* Фото */}
          <div>
            {product.imagePreview && (
              <Image
                src={product.imagePreview}
                alt="preview"
                width={260}
                height={260}
                className="rounded-xl border shadow"
              />
            )}
          </div>

        </div>
      </div>

      {/* Размеры */}
      <div className="p-6 border rounded-2xl bg-gray-50 shadow-sm">
        <h3 className="text-2xl font-bold mb-4 text-[#21004B]">Размеры</h3>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-lg">
              <th className="pb-2">Размер</th>
              <th className="pb-2">Кол-во</th>
              <th className="pb-2">Штрихкод</th>
              <th className="pb-2">SKU</th>
            </tr>
          </thead>

          <tbody>
            {product.sizes.map((s, i) => {
              const sku = makeSKU(product.brand, product.model, product.color, s.size);

              return (
                <tr key={i} className="border-b">
                  <td className="py-3">{s.size}</td>
                  <td className="py-3">{s.quantity}</td>
                  <td className="py-3">{s.barcode || "—"}</td>
                  <td className="py-3 font-mono text-sm">{sku}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Услуги */}
      <div className="p-6 border rounded-2xl bg-gray-50 shadow-sm">
        <h3 className="text-2xl font-bold mb-4 text-[#21004B]">Услуги</h3>

        {product.services?.length > 0 ? (
          <ul className="list-disc ml-6 text-lg">
            {product.services.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Услуги не выбраны</p>
        )}
      </div>

      {/* Навигация */}
      <div className="flex gap-6">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-gray-300 text-black font-bold"
        >
          ← Назад
        </button>

        <button
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-[#21004B] text-white font-bold hover:opacity-90"
        >
          Создать поставку →
        </button>
      </div>

    </div>
  );
}
