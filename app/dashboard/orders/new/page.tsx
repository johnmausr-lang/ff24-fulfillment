"use client";

import { useCart } from "@/hooks/useCart";
import { useState } from "react";

export default function NewOrderPage() {
  const cart = useCart();
  const [status, setStatus] = useState("");

  async function submitOrder() {
    const payload = {
      name: `Заказ #${Date.now()}`,
      positions: cart.items.map((i: any) => ({
        quantity: i.qty,
        price: i.salePrices?.[0]?.value || 0,
        assortment: { meta: i.meta },
      })),
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      setStatus("success");
      cart.clear();
    } else {
      setStatus("error");
    }
  }

  if (cart.items.length === 0)
    return <p className="text-gray-500">Корзина пуста</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Оформление заказа</h1>

      <div className="bg-white p-6 border rounded-lg shadow w-full max-w-xl">
        <ul className="mb-4">
          {cart.items.map((i: any) => (
            <li key={i.id} className="flex justify-between border-b py-2">
              <span>{i.name}</span>
              <span>{(i.salePrices?.[0]?.value || 0) / 100} ₽</span>
            </li>
          ))}
        </ul>

        {status === "success" && (
          <p className="text-green-600 mb-3">
            Заказ успешно создан!
          </p>
        )}

        {status === "error" && (
          <p className="text-red-600 mb-3">
            Ошибка при создании заказа.
          </p>
        )}

        <button
          onClick={submitOrder}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Отправить заказ
        </button>
      </div>
    </div>
  );
}
