"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((d) => setOrders(d.data || []));
  }, []);

  return (
    <div className="space-y-10">

      <h1 className="text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(107,0,255,0.45)]">
        Заказы
      </h1>

      <div
        className="
          bg-white/5 backdrop-blur-xl border border-white/10 
          rounded-2xl overflow-hidden shadow-[0_0_45px_rgba(107,0,255,0.25)]
        "
      >
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/10">
              <th className="p-4 text-white/70">Номер</th>
              <th className="p-4 text-white/70">Дата</th>
              <th className="p-4 text-white/70">Статус</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                className="border-t border-white/5 hover:bg-white/10 transition-all"
              >
                <td className="p-4">
                  <Link
                    href={`/dashboard/orders/${o.id}`}
                    className="text-[#FF6B00] hover:underline"
                  >
                    {o.name}
                  </Link>
                </td>
                <td className="p-4">{o.created?.slice(0, 10)}</td>

                <td className="p-4">
                  <span
                    className="
                      px-3 py-1 rounded-lg text-sm
                      bg-purple-500/20 text-purple-300
                      border border-purple-500/30
                    "
                  >
                    Новый
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="p-6 text-white/40 text-center">Заказов нет</p>
        )}
      </div>
    </div>
  );
}
