"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";

export default function CartSidebar() {
  const cart = useCart();

  const total = cart.items.reduce(
    (acc: number, p: any) => acc + (p.salePrices?.[0]?.value || 0),
    0
  );

  return (
    <aside className="w-80 bg-white border rounded-lg shadow p-4 h-fit sticky top-4">
      <h3 className="text-xl font-semibold mb-4">Корзина</h3>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {cart.items.map((item: any) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                {(item.salePrices?.[0]?.value || 0) / 100} ₽
              </p>
            </div>

            <button
              onClick={() => cart.remove(item.id)}
              className="text-red-500 hover:underline"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>

      <p className="mt-4 text-lg font-semibold">
        Итого: {total / 100} ₽
      </p>

      <Link
        href="/dashboard/orders/new"
        className="mt-4 block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Оформить заказ
      </Link>
    </aside>
  );
}
