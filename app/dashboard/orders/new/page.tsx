"use client";

import { useState } from "react";

type Position = {
  name: string;
  vendorCode: string;
  color: string;
  size: string;
  quantity: number;
  brand: string;
};

export default function NewOrderPage() {
  const [positions, setPositions] = useState<Position[]>([
    { name: "", vendorCode: "", color: "", size: "", quantity: 1, brand: "" },
  ]);

  const [comment, setComment] = useState("");
  const [isSending, setIsSending] = useState(false);

  const updatePosition = (i: number, key: keyof Position, value: any) => {
    const copy = [...positions];
    copy[i] = { ...copy[i], [key]: value };
    setPositions(copy);
  };

  const addRow = () => {
    setPositions([
      ...positions,
      { name: "", vendorCode: "", color: "", size: "", quantity: 1, brand: "" },
    ]);
  };

  const submit = async () => {
    setIsSending(true);

    const response = await fetch("/api/orders/create", {
      method: "POST",
      body: JSON.stringify({
        positions,
        comment,
      }),
    });

    const data = await response.json();
    setIsSending(false);

    if (data.ok) {
      alert("Заказ создан!");
      window.location.href = "/dashboard/orders";
    } else {
      alert("Ошибка: " + data.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Создать заказ</h1>

      {positions.map((p, i) => (
        <div key={i} className="grid grid-cols-6 gap-4 mb-4 border p-4 rounded-lg">
          <input
            className="border p-2"
            placeholder="Название"
            value={p.name}
            onChange={(e) => updatePosition(i, "name", e.target.value)}
          />
          <input
            className="border p-2"
            placeholder="Артикул"
            value={p.vendorCode}
            onChange={(e) => updatePosition(i, "vendorCode", e.target.value)}
          />
          <input
            className="border p-2"
            placeholder="Цвет"
            value={p.color}
            onChange={(e) => updatePosition(i, "color", e.target.value)}
          />
          <input
            className="border p-2"
            placeholder="Размер"
            value={p.size}
            onChange={(e) => updatePosition(i, "size", e.target.value)}
          />
          <input
            type="number"
            className="border p-2"
            placeholder="Кол-во"
            value={p.quantity}
            onChange={(e) => updatePosition(i, "quantity", Number(e.target.value))}
          />
          <input
            className="border p-2"
            placeholder="Бренд"
            value={p.brand}
            onChange={(e) => updatePosition(i, "brand", e.target.value)}
          />
        </div>
      ))}

      <button
        className="px-4 py-2 bg-gray-200 rounded mb-4"
        onClick={addRow}
      >
        + Добавить позицию
      </button>

      <textarea
        className="w-full border p-3 mb-4"
        placeholder="Комментарий к заказу"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={submit}
        disabled={isSending}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
      >
        {isSending ? "Создание..." : "Создать заказ"}
      </button>
    </div>
  );
}
