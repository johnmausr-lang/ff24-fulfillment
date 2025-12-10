"use client";

import { useEffect, useState } from "react";
import { MSInventoryRow } from "@/lib/moysklad/types";

export default function StockPage() {
  const [stock, setStock] = useState<MSInventoryRow[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/inventory")
      .then((r) => r.json())
      .then((d) => setStock(d.data || []));
  }, []);

  const filtered = stock.filter((item) =>
    (item.assortment?.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Остатки</h1>

      <input
        type="text"
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="inputFF24 max-w-sm"
      />

      <table className="w-full text-left bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
        <thead>
          <tr className="bg-white/10">
            <th className="p-4">Товар</th>
            <th className="p-4">Остаток</th>
            <th className="p-4">Свободно</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item, idx) => (
            <tr
              key={idx}
              className="border-t border-white/5 hover:bg-white/10 transition-all"
            >
              <td className="p-4">{item.assortment?.name || "—"}</td>
              <td className="p-4">{item.stock}</td>
              <td className="p-4">{item.freeStock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
