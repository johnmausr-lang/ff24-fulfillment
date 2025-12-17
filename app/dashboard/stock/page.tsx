"use client";

import { useEffect, useState } from "react";
import { Boxes, Search, Package, AlertCircle } from "lucide-react";

// Локальный интерфейс для TypeScript, чтобы избежать ошибок импорта
interface MSInventoryRow {
  name: string;
  code?: string;
  stock: number;
  price: number;
  quantity?: number; // На случай разных форматов API МойСклад
}

export default function StockPage() {
  const [stock, setStock] = useState<MSInventoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchStock() {
      try {
        // Временно используем этот роут, пока не создадим отдельный /api/inventory
        const res = await fetch("/api/auth/check-user"); 
        const data = await res.json();
        
        // Исправлено: используем правильную функцию обновления состояния
        if (data && data.rows) {
          setStock(data.rows);
        } else {
          setStock([]); // Если данных нет, устанавливаем пустой массив
        }
      } catch (e) {
        console.error("Ошибка загрузки остатков:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchStock();
  }, []);

  // Фильтрация товаров по поисковому запросу
  const filteredStock = stock.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.code && item.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок и поиск */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black italic uppercase text-[#3A1C5F]">
            Складские остатки
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Актуальные данные из системы МойСклад
          </p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Поиск по названию или артикулу..."
            className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl w-full md:w-80 outline-none focus:ring-2 ring-[#D9FF00] transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        /* Скелетон загрузки */
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-20 bg-slate-100 rounded-[1.5rem] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-[#3A1C5F] font-bold text-xs uppercase italic tracking-wider">
                  <th className="p-5">Товар</th>
                  <th className="p-5">Артикул</th>
                  <th className="p-5">Доступно</th>
                  <th className="p-5">Цена</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStock.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-5 font-bold text-[#3A1C5F] group-hover:text-black">
                      {item.name}
                    </td>
                    <td className="p-5 text-slate-500 font-mono text-sm">
                      {item.code || "—"}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          item.stock > 0 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {item.stock} шт.
                        </span>
                        {item.stock <= 5 && item.stock > 0 && (
                          <AlertCircle size={14} className="text-amber-500" />
                        )}
                      </div>
                    </td>
                    <td className="p-5 font-black text-[#3A1C5F]">
                      {((item.price || 0) / 100).toLocaleString()} ₽
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Пустое состояние */}
          {filteredStock.length === 0 && (
            <div className="p-20 text-center text-slate-400">
              <Boxes className="mx-auto mb-4 opacity-20" size={64} />
              <p className="font-bold uppercase italic text-sm tracking-widest">Товары не найдены</p>
              <p className="text-xs mt-1">Попробуйте изменить запрос или синхронизировать остатки</p>
            </div>
          )}
        </div>
      )}

      {/* Информационная карточка снизу */}
      <div className="bg-[#3A1C5F] rounded-[2rem] p-6 text-white flex items-center justify-between overflow-hidden relative">
        <div className="relative z-10">
          <div className="text-[#D9FF00] font-black italic uppercase text-lg">Обновление данных</div>
          <p className="text-white/70 text-sm max-w-md mt-1">
            Остатки синхронизируются с «МойСклад» каждые 15 минут. Если вы не видите недавнюю приемку, подождите немного.
          </p>
        </div>
        <Package size={80} className="absolute -right-4 -bottom-4 text-white/10 rotate-12" />
      </div>
    </div>
  );
}
