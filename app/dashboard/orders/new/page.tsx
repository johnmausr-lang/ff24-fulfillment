"use client";

import { useEffect, useState } from "react";

export default function NewOrderPage() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/inventory", { credentials: "include" });
      const data = await res.json();
      setInventory(data);
      setLoading(false);
    }
    load();
  }, []);

  const toggle = (p: any) => {
    setSelected((prev) =>
      prev.find((x) => x.productId === p.productId)
        ? prev.filter((x) => x.productId !== p.productId)
        : [...prev, { ...p, quantity: 1 }]
    );
  };

  const createOrder = async () => {
    setOk("");
    setErr("");

    const res = await fetch("/api/orders/new", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ positions: selected }),
    });

    if (!res.ok) {
      setErr("Ошибка создания заказа");
      return;
    }

    setOk("Заказ успешно создан!");
    setSelected([]);
  };

  if (loading) return <div className="p-6">Загрузка…</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Создать заказ</h1>

      {ok && <div className="text-green-600">{ok}</div>}
      {err && <div className="text-red-600">{err}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {inventory.map((p) => (
          <div
            key={p.productId}
            className={`border rounded-xl p-4 cursor-pointer ${
              selected.find((s) => s.productId === p.productId)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            }`}
            onClick={() => toggle(p)}
          >
            <b>{p.name}</b>
            <div className="text-sm text-gray-600">Код: {p.code}</div>
            <div className="text-sm">Остаток: {p.stock}</div>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <button
          onClick={createOrder}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl"
        >
          Создать заказ
        </button>
      )}
    </div>
  );
}
