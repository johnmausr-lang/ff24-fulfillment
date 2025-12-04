"use client";

import { useEffect, useState } from "react";

export default function OrdersList() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setItems(d.items || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка…</p>;

  if (items.length === 0) return <p>Пока нет заявок.</p>;

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="border p-4 mb-4 bg-white rounded shadow"
        >
          <p className="text-xl font-semibold">{item.name}</p>
          <p className="text-gray-500">{item.description}</p>
          <p className="text-sm mt-2">
            Создано: {new Date(item.created).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
