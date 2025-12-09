// app/dashboard/stock/page.tsx

"use client";

import { useEffect, useState } from "react";

export default function StockPage() {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    fetch("/api/inventory")
      .then((r) => r.json())
      .then((d) => setStock(d.data || []));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Остатки товара</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow border">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 border-b">Товар</th>
              <th className="p-3 border-b">Остаток</th>
            </tr>
          </thead>

          <tbody>
            {stock.map((s: any) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{s.name}</td>
                <td className="p-3 border-b">{s.stock || s.quantity || 0}</td>
              </tr>
            ))}

            {stock.length === 0 && (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-500">
                  Нет данных о запасах
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
