"use client";

import { useEffect, useState } from "react";
import { Package, Search, Download, Barcode, History } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/inventory')
      .then(res => res.json())
      .then(data => {
        setItems(data.items);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 space-y-8 bg-[#1A0B2E] min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black italic uppercase text-[#D9FF00]">Мои Остатки</h1>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Товары на хранении в FF24</p>
        </div>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl transition-all">
          <Download size={18} /> <span className="text-xs font-black uppercase italic">Экспорт XLS</span>
        </button>
      </div>

      {/* Фильтры */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            className="w-full bg-[#2A1445] border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#D9FF00] transition-all"
            placeholder="Поиск по бренду, названию или штрихкоду..."
          />
        </div>
        <div className="bg-[#2A1445] border border-white/5 rounded-2xl flex items-center px-6">
          <span className="text-slate-400 text-xs font-bold uppercase">Всего позиций: {items.length}</span>
        </div>
      </div>

      {/* Таблица остатков */}
      <div className="bg-[#2A1445] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#3A1C5F] text-[#D9FF00] text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="p-6">Товар / Бренд</th>
                <th className="p-6">Артикул / ШК</th>
                <th className="p-6 text-center">Остаток</th>
                <th className="p-6 text-right">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={4} className="p-20 text-center text-slate-500 italic">Загрузка данных склада...</td></tr>
              ) : items.map((item: any) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1A0B2E] rounded-xl flex items-center justify-center text-[#D9FF00] border border-white/5">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="font-black italic uppercase text-sm leading-none mb-1">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.brand} | {item.color} | {item.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-[#D9FF00] bg-[#D9FF00]/10 px-2 py-0.5 rounded self-start">{item.barcode}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase italic">Ref: {item.id}</span>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className={`text-xl font-black italic ${item.stock < 10 ? 'text-orange-500' : 'text-white'}`}>
                      {item.stock} <span className="text-[10px] uppercase ml-1">шт.</span>
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-[10px] font-black uppercase italic text-[#D9FF00] border-b border-[#D9FF00]/0 hover:border-[#D9FF00]/100 transition-all">
                      История <History className="inline ml-1" size={12} />
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
