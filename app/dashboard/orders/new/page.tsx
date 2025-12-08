'use client';

import React, { useState } from "react";

interface OrderPosition {
  name: string;
  vendorCode: string;
  color: string;
  size: string;
  quantity: number;
  brand: string;
  photoUrl?: string;
}

export default function NewOrderPage() {
  const [positions, setPositions] = useState<OrderPosition[]>([
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

  // ---------------------------
  // Фиксированная функция updatePos
  // ---------------------------
  const updatePos = <K extends keyof OrderPosition>(
    i: number,
    field: K,
    value: OrderPosition[K]
  ) => {
    const copy = [...positions];
    copy[i] = { ...copy[i], [field]: value };
    setPositions(copy);
  };

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Создать заказ</h1>

      {positions.map((pos, i) => (
        <div key={i} className="border p-4 rounded-xl mb-4 bg-white shadow">
          <h2 className="font-semibold mb-2">Позиция {i + 1}</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              placeholder="Название"
              value={pos.name}
              onChange={(e) => updatePos(i, "name", e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="Артикул"
              value={pos.vendorCode}
              onChange={(e) => updatePos(i, "vendorCode", e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="Цвет"
              value={pos.color}
              onChange={(e) => updatePos(i, "color", e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="Размер"
              value={pos.size}
              onChange={(e) => updatePos(i, "size", e.target.value)}
            />

            <input
              className="border p-2 rounded"
              type="number"
              placeholder="Кол-во"
              value={pos.quantity}
              onChange={(e) => updatePos(i, "quantity", Number(e.target.value))}
            />

            <input
              className="border p-2 rounded"
              placeholder="Бренд"
              value={pos.brand}
              onChange={(e) => updatePos(i, "brand", e.target.value)}
            />
          </div>
        </div>
      ))}

      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded mt-3"
        onClick={addPosition}
      >
        Добавить позицию
      </button>
    </div>
  );
}
