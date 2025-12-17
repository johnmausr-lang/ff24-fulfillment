"use client";

import { useEffect, useState } from "react";
import { Boxes, Search, AlertTriangle, TrendingUp } from "lucide-react";

// Локальные типы для склада, чтобы билд не падал
interface MSInventoryRow {
  name: string;
  code?: string;
  quantity: number;
  price: number;
  stock: number;
}

export default function StockPage() {
  const [stock, setStock] = useState<MSInventoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchStock() {
      try {
        const res = await fetch("/api/auth/check-user"); // Временно, пока не создадим роут остатков
        const data = await res.json();
        if (data.rows) setOrders(data.rows);
      } catch (e) {
        console.error("Ошибка загрузки остатков");
      } finally {
        setLoading(false);
      }
    }
    fetchStock();
  }, []);

  const filteredStock = stock.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black italic uppercase text-[#3A1C5F]">Складские остатки</h1>
          <p className="text-slate-500 text-sm">Актуальные данные из МойСклад</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Поиск по названию или артикулу..."
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl w-full md:w-80 outline-none focus:ring-2 ring-[#D9FF00]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-100 rounded-[2rem]" />)}
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[#3A1C5F] font-bold text-sm uppercase italic">
                <th className="p-5">Товар</th>
                <th className="p-5">Артикул</th>
                <th className="p-5">Доступно</th>
                <th className="p-5">Цена (базовая)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStock.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition">
                  <td className="p-5 font-bold">{item.name}</td>
                  <td className="p-5 text-slate-500">{item.code || "—"}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-black ${item.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.stock} шт.
                    </span>
                  </td>
                  <td className="p-5 font-black text-[#3A1C5F]">{(item.price / 100).toLocaleString()} ₽</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStock.length === 0 && (
            <div className="p-20 text-center text-slate-400">
              <Boxes className="mx-auto mb-4 opacity-20" size={48} />
              Товары не найдены
            </div>
          )}
        </div>
      )}
    </div>
  );
}
