"use client";

import { useEffect, useState } from "react";
import { Package, Search, Loader2, AlertCircle, RefreshCcw } from "lucide-react";
import { toast } from "react-hot-toast";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStock = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inventory');
      const data = await res.json();
      if (res.ok) {
        setItems(data.items);
      } else {
        toast.error(data.error || "Ошибка загрузки");
      }
    } catch (err) {
      toast.error("Ошибка связи с МойСклад");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStock(); }, []);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.article.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#1A0B2E] min-h-screen text-white">
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
          className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-[#D9FF00]"
        >
          <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text"
          placeholder="Поиск по названию или артикулу..."
          className="w-full bg-[#2A1445] border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 outline-none focus:border-[#D9FF00] transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-[#2A1445] rounded-[3rem] border border-white/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/20 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">
              <th className="p-8">Товар</th>
              <th className="p-8">Артикул</th>
              <th className="p-8 text-center">На складе</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={3} className="p-20 text-center">
                  <Loader2 className="animate-spin mx-auto text-[#D9FF00] mb-4" size={40} />
                  <p className="font-black italic uppercase text-slate-500">Синхронизация...</p>
                </td>
              </tr>
            ) : filteredItems.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-20 text-center text-slate-600">
                  <AlertCircle className="mx-auto mb-4 opacity-20" size={40} />
                  <p className="font-black italic uppercase">Товары не найдены</p>
                </td>
              </tr>
            ) : (
              filteredItems.map((item: any) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#D9FF00]">
                        <Package size={24} />
                      </div>
                      <div>
                        <p className="font-black italic uppercase text-sm">{item.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold">{item.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8 font-mono text-xs text-slate-400">{item.article}</td>
                  <td className="p-8 text-center">
                    <span className="bg-[#1A0B2E] px-6 py-3 rounded-xl border border-white/5 font-black text-[#D9FF00] italic">
                      {item.stock} <span className="text-[10px] text-slate-500 ml-1">ШТ</span>
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
