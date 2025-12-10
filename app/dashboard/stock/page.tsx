"use client";

import { useEffect, useState } from "react";

export default function StockPage() {
  const [stock, setStock] = useState([]);
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
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,107,0,0.35)]">
        Остатки товара
      </h1>

      {/* Поиск */}
      <input
        type="text"
        placeholder="Поиск по названию…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full p-4 rounded-xl
          bg-white/5 border border-white/10 text-white
          focus:border-[#FF6B00] outline-none
        "
      />

      {/* Таблица */}
      <div
        className="
          bg-white/5 backdrop-blur-xl border border-white/10 
          rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,107,0,0.15)]
        "
      >
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/10">
              <th className="p-4 text-white/70">Товар</th>
              <th className="p-4 text-white/70">Доступно</th>
              <th className="p-4 text-white/70">На складе</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, i) => (
              <tr
                key={i}
                className="
                  border-t border-white/5
                  hover:bg-white/10 transition-all
                "
              >
                <td className="p-4">{row.assortment?.name}</td>
                <td className="p-4 text-[#FF6B00] font-semibold">{row.freeStock}</td>
                <td className="p-4 text-white/90">{row.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="p-6 text-white/40 text-center">Нет данных</p>
        )}
      </div>
    </div>
  );
}
