"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);

      const res = await fetch("/api/orders/list");

      if (!res.ok) {
        console.error("Ошибка API списка заказов");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setOrders(data.orders || []);
      setLoading(false);
    } catch (e) {
      console.error("Ошибка загрузки заказов:", e);
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Мои заказы</h1>

        <Link
          href="/dashboard/orders/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Новый заказ
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-600">Загружаем ваши заказы…</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">У вас пока нет заказов.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">
                    Заказ № {order.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Дата: {order.moment?.slice(0, 10)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">{order.sum / 100} ₽</p>
                  <p className="text-sm text-gray-500">
                    позиций: {order.positions?.length ?? 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
