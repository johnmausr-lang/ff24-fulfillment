"use client";

import { useState, useEffect } from "react";
import { TruckFullscreenLoader } from "@/components/ui/truck-fullscreen-loader";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("/api/orders/list");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (e) {
        console.error("Load orders error", e);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  if (loading) {
    return (
      <TruckFullscreenLoader
        isLoading={true}
        message="Загружаем список заказов..."
      />
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Заказы</h1>
      <div className="bg-card rounded-xl border p-6">
        {orders.length === 0 ? (
          <p>Заказов пока нет</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id} className="py-2 border-b">
                Заказ #{order.name} — {order.moment?.slice(0, 10)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <TruckFullscreenLoader isLoading={false} />
    </div>
  );
}
