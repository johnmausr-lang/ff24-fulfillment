// app/dashboard/orders/page.tsx

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
    <div>
      <h1 className="text-2xl font-semibold mb-6">Заказы</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow border">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 border-b">№</th>
              <th className="p-3 border-b">Дата</th>
              <th className="p-3 border-b">Сумма</th>
              <th className="p-3 border-b">Статус</th>
              <th className="p-3 border-b"></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o: any) => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{o.name}</td>
                <td className="p-3 border-b">{o.moment?.slice(0, 10)}</td>
                <td className="p-3 border-b">{o.sum / 100}</td>
                <td className="p-3 border-b">{o.state?.name || "—"}</td>
                <td className="p-3 border-b text-right">
                  <Link
                    href={`/dashboard/orders/${o.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Открыть →
                  </Link>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Нет заказов
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
