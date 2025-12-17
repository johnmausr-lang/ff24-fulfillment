"use client";

import { useEffect, useState } from "react";
import { Package, Search, Loader2, AlertCircle, RefreshCcw } from "lucide-react";
import { toast } from "react-hot-toast";

// Описываем структуру данных товара для TypeScript
interface InventoryItem {
  id: string;
  name: string;
  brand: string;
  article: string;
  stock: number;
}

export default function InventoryPage() {
  // Указываем тип состояния как массив InventoryItem
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStock = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inventory');
      const data = await res.json();
      if (res.ok) {
        // Гарантируем, что записываем массив
        setItems(data.items || []);
      } else {
        toast.error(data.error || "Ошибка загрузки");
      }
    } catch (err) {
      toast.error("Ошибка связи с МойСклад");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  // Теперь поиск работает без ошибок типов
  const filteredItems = items.filter((item) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.article.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#1A0B2E] min-h-screen text-white">
      {/* Заголовок */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black italic uppercase leading-none">
            Текущий <span className="text-[#D9FF00]">Сток</span>
          </h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">
            Данные в реальном времени из МойСклад
          </p>
        </div>
        <button 
          onClick={fetchStock}
          disabled={loading}
          className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-[#D9FF00] disabled:opacity-50"
        >
          <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Поиск */}
      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text"
          placeholder="Поиск по названию или артикулу..."
          className="w-full bg-[#2A1445] border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 outline-none focus:border-[#D9FF00] transition-all font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Таблица остатков */}
      <div className="bg-[#2A1445] rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">
                <th className="p-8">Товар / Бренд</th>
                <th className="p-8 text-center">Артикул</th>
                <th className="p-8 text-center">На складе</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={3} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="animate-spin text-[#D9FF00]" size={40} />
                      <p className="font-black italic uppercase text-slate-500 text-sm">Синхронизация с МС...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-20">
                      <AlertCircle size={48} />
                      <p className="font-black italic uppercase tracking-widest">Товары не найдены</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-[#1A0B2E] rounded-2xl flex items-center justify-center text-[#D9FF00] border border-white/5 group-hover:border-[#D9FF00]/30 transition-all">
                          <Package size={24} />
                        </div>
                        <div>
                          <p className="font-black italic uppercase text-lg leading-none mb-1">{item.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            Бренд: <span className="text-[#D9FF00]">{item.brand}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-8 text-center">
                      <span className="text-xs font-mono text-slate-400 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                        {item.article}
                      </span>
                    </td>
                    <td className="p-8 text-center">
                      <div className="inline-flex flex-col items-center bg-[#1A0B2E] px-6 py-3 rounded-2xl border border-white/5">
                        <span className={`text-2xl font-black italic ${item.stock <= 0 ? 'text-red-500' : 'text-white'}`}>
                          {item.stock}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Единиц</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
