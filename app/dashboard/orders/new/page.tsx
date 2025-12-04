"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type OrderPosition = {
  name: string;
  vendorCode: string;
  color: string;
  size: string;
  quantity: number;
  brand: string;
};

export default function NewOrderPage() {
  const router = useRouter();

  const [positions, setPositions] = useState<OrderPosition[]>([
    { name: "", vendorCode: "", color: "", size: "", quantity: 1, brand: "" },
  ]);

  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  // ---- universal updater (now type-safe)
  const updatePosition = <K extends keyof OrderPosition>(
    i: number,
    key: K,
    value: OrderPosition[K]
  ) => {
    const copy = [...positions];
    copy[i][key] = value;
    setPositions(copy);
  };

  const addPosition = () => {
    setPositions([
      ...positions,
      { name: "", vendorCode: "", color: "", size: "", quantity: 1, brand: "" },
    ]);
  };

  const removePosition = (i: number) => {
    setPositions(positions.filter((_, idx) => idx !== i));
  };

  const submitOrder = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          positions,
          workInstructions: instructions,
        }),
      });

      if (!res.ok) {
        alert("Ошибка отправки заказа");
        setLoading(false);
        return;
      }

      const data = await res.json();

      alert("Заказ успешно создан!");
      router.push("/dashboard/orders");
    } catch (err) {
      console.error("Ошибка создания заказа:", err);
      alert("Ошибка соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Создать новый заказ</h1>

      {/* --- positions block --- */}
      <div className="space-y-6">
        {positions.map((pos, i) => (
          <div key={i} className="border p-4 rounded-lg bg-white shadow-sm">
            <div className="flex justify-between">
              <h2 className="font-semibold text-lg">Позиция {i + 1}</h2>
              {positions.length > 1 && (
                <button
                  onClick={() => removePosition(i)}
                  className="text-red-600 hover:underline"
                >
                  Удалить
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                className="border p-2 rounded"
                placeholder="Название товара"
                value={pos.name}
                onChange={(e) => updatePosition(i, "name", e.target.value)}
              />

              <input
                className="border p-2 rounded"
                placeholder="Артикул"
                value={pos.vendorCode}
                onChange={(e) => updatePosition(i, "vendorCode", e.target.value)}
              />

              <input
                className="border p-2 rounded"
                placeholder="Цвет"
                value={pos.color}
                onChange={(e) => updatePosition(i, "color", e.target.value)}
              />

              <input
                className="border p-2 rounded"
                placeholder="Размер"
                value={pos.size}
                onChange={(e) => updatePosition(i, "size", e.target.value)}
              />

              <input
                className="border p-2 rounded"
                type="number"
                min="1"
                placeholder="Количество"
                value={pos.quantity}
                onChange={(e) =>
                  updatePosition(i, "quantity", Number(e.target.value))
                }
              />

              <input
                className="border p-2 rounded"
                placeholder="Бренд"
                value={pos.brand}
                onChange={(e) => updatePosition(i, "brand", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addPosition}
        className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        + Добавить позицию
      </button>

      {/* --- instructions --- */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Инструкции к заказу</h2>
        <textarea
          className="border p-3 rounded w-full h-32"
          placeholder="Например: упаковать в термопакет…"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>

      {/* --- submit button --- */}
      <button
        disabled={loading}
        onClick={submitOrder}
        className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Создаем заказ…" : "Создать заказ"}
      </button>
    </div>
  );
}
