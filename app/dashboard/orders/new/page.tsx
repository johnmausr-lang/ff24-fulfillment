"use client";

import { useState } from "react";

export default function NewOrderPage() {
  const [positions, setPositions] = useState([
    { name: "", vendorCode: "", color: "", size: "", quantity: 1, brand: "" },
  ]);

  const addPosition = () => {
    setPositions([
      ...positions,
      { name: "", vendorCode: "", color: "", size: "", quantity: 1, brand: "" },
    ]);
  };

  const updatePosition = (i: number, key: string, value: any) => {
    const copy = [...positions];
    copy[i][key] = value;
    setPositions(copy);
  };

  const submitForm = async () => {
    const res = await fetch("/api/orders/new", {
      method: "POST",
      body: JSON.stringify({ positions }),
    });

    const data = await res.json();
    console.log("Ответ API:", data);

    if (data.ok) {
      alert("Заявка создана!");
    } else {
      alert("Ошибка: " + data.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Создание новой заявки</h1>

      {positions.map((p, i) => (
        <div key={i} className="border p-4 mb-4 rounded bg-white shadow">
          <h3 className="font-semibold mb-2">Позиция {i + 1}</h3>

          <div className="grid grid-cols-2 gap-4 mb-2">
            <input
              placeholder="Название"
              className="border p-2 rounded"
              value={p.name}
              onChange={(e) => updatePosition(i, "name", e.target.value)}
            />

            <input
              placeholder="Артикул"
              className="border p-2 rounded"
              value={p.vendorCode}
              onChange={(e) =>
                updatePosition(i, "vendorCode", e.target.value)
              }
            />

            <input
              placeholder="Цвет"
              className="border p-2 rounded"
              value={p.color}
              onChange={(e) => updatePosition(i, "color", e.target.value)}
            />

            <input
              placeholder="Размер"
              className="border p-2 rounded"
              value={p.size}
              onChange={(e) => updatePosition(i, "size", e.target.value)}
            />

            <input
              type="number"
              placeholder="Количество"
              className="border p-2 rounded"
              value={p.quantity}
              onChange={(e) =>
                updatePosition(i, "quantity", Number(e.target.value))
              }
            />

            <input
              placeholder="Бренд"
              className="border p-2 rounded"
              value={p.brand}
              onChange={(e) => updatePosition(i, "brand", e.target.value)}
            />
          </div>
        </div>
      ))}

      <button
        onClick={addPosition}
        className="bg-gray-200 px-4 py-2 rounded mr-4"
      >
        + Добавить позицию
      </button>

      <button
        onClick={submitForm}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Создать заявку
      </button>
    </div>
  );
}
