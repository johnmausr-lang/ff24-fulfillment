// app/dashboard/orders/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";

export default function OrderDetails({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((r) => r.json())
      .then((d) => setOrder(d.data));
  }, []);

  if (!order) return <p>Загрузка...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Заказ {order.name}
      </h1>

      <div className="bg-white p-4 rounded-lg shadow border mb-6">
        <p><b>ID:</b> {order.id}</p>
        <p><b>Дата:</b> {order.moment?.slice(0, 10)}</p>
        <p><b>Сумма:</b> {order.sum / 100}</p>
        <p><b>Статус:</b> {order.state?.name || "—"}</p>
      </div>
    </div>
  );
}
