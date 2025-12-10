"use client";

import { useEffect, useState } from "react";
import { MSOrder } from "@/lib/moysklad/types";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<MSOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((d) => {
        setOrders(d.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Заказы</h1>

      {loading && <div>Загрузка…</div>}

      {!loading && (
        <table className="w-full text-left bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
          <thead>
            <tr className="bg-white/10">
              <th className="p-4">ID</th>
              <th className="p-4">Название</th>
              <th className="p-4">Дата</th>
              <th className="p-4">Подробнее</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                className="border-t border-white/5 hover:bg-white/10 transition-all"
              >
                <td className="p-4">{o.id}</td>
                <td className="p-4">{o.name}</td>
                <td className="p-4">{o.created || "—"}</td>
                <td className="p-4">
                  <Link
                    href={`/dashboard/orders/${o.id}`}
                    className="text-[#FF6B00] hover:underline"
                  >
                    Открыть →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
