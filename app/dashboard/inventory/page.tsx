"use client";

import { useEffect, useState } from "react";
import { Package, Search, Filter, ArrowUpDown, History, Download } from "lucide-react";
import { toast } from "react-hot-toast";

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch('/api/inventory');
        const data = await res.json();
        if (res.ok) {
          setItems(data.items);
        } else {
          toast.error("Ошибка загрузки остатков");
        }
      } catch (e) {
        toast.error("Ошибка сети");
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.article.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#1A0B2E] p-6 md:p-10 text-white">
      {/* Шапка */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black italic uppercase text-white leading-none">
            Складской <span className="text-[#D9FF00]">Сток</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2 italic">
            Актуальные остатки на хранении FF24
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#D9FF00] text-[#1A0B2E] px-6 py-4 rounded-2xl font-black uppercase italic text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(217,255,0,0.1)]">
          <Download size={18} /> Скачать отчет
        </button>
      </div>

      {/* Фильтры и Поиск */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text"
            placeholder="Поиск по названию или артикулу..."
            className="w-full bg-[#2A1445] border border-white/5 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-[#D9FF00] transition-all font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="bg-[#2A1445] border border-white/5 rounded-2xl flex items-center justify-center gap-3 text-slate-400 hover:text-white transition-all uppercase font-black text-xs italic tracking-widest">
          <Filter size={18} /> Фильтры
        </button>
        <button className="bg-[#2A1445] border border-white/5 rounded-2xl flex items-center justify-center gap-3 text-slate-400 hover:text-white transition-all uppercase font-black text-xs italic tracking-widest">
          <ArrowUpDown size={18} /> Сортировка
        </button>
      </div>

      {/* Таблица */}
      <div className="bg-[#2A1445] rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#3A1C5F] text-[#D9FF00] text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="p-8">Товар / Бренд</th>
                <th className="p-8">Данные SKU</th>
                <th className="p-8 text-center">Остаток</th>
                <th className="p-8 text-right">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-slate-500 italic uppercase font-bold text-sm">
                      <div className="w-10 h-10 border-4 border-[#D9FF00] border-t-transparent rounded-full animate-spin" />
                      Синхронизация с базой FF24...
                    </div>
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center text-slate-500 uppercase font-black italic">
                    Товары не найдены
                  </td>
                </tr>
              ) : filteredItems.map((item) => (
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
                  <td className="p-8">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-white bg-white/5 px-3 py-1 rounded-full self-start border border-white/5">
                        SN: {item.article}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase italic flex items-center gap-2">
                        EAN-13: <span className="text-white/60">{item.barcode}</span>
                      </span>
                    </div>
                  </td>
                  <td className="p-8 text-center">
                    <div className="inline-flex flex-col items-center bg-[#1A0B2E] px-6 py-3 rounded-2xl border border-white/5">
                      <span className={`text-2xl font-black italic ${item.stock < 10 ? 'text-red-500' : 'text-white'}`}>
                        {item.stock}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Единиц</span>
                    </div>
                  </td>
                  <td className="p-8 text-right">
                    <button className="bg-white/5 hover:bg-[#D9FF00] hover:text-[#1A0B2E] p-4 rounded-xl transition-all group-hover:translate-x-[-5px]">
                      <History size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
