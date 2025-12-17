"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface StockItem {
  name: string;
  code: string;
  quantity: number;
  price: number;
  article?: string;
}

export default function DashboardPage() {
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch("/api/dashboard/stock");
        const data = await res.json();
        if (res.ok) {
          setStocks(data.stocks);
        } else {
          toast.error(data.error || "Не удалось загрузить остатки");
        }
      } catch (err) {
        toast.error("Ошибка подключения к серверу");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const totalQty = stocks.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Шапка дашборда */}
      <nav className="bg-[#3A1C5F] text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Image src="/logo-ff24.png" alt="FF24" width={120} height={40} className="brightness-200" />
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-80">Личный кабинет клиента</span>
            <button 
               onClick={() => { document.cookie = "token=; max-age=0"; window.location.href = "/login"; }}
               className="bg-[#D9FF00] text-[#3A1C5F] px-4 py-1 rounded-full text-xs font-bold hover:opacity-90 transition-all"
            >
              ВЫЙТИ
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#3A1C5F] uppercase italic tracking-tight">Ваши остатки на складе</h1>
            <p className="text-slate-500">Актуальные данные из МойСклад в реальном времени</p>
          </div>
          
          <button className="bg-[#D9FF00] hover:bg-[#c4e600] text-[#3A1C5F] font-black px-8 py-4 rounded-2xl shadow-xl shadow-lime-100 transition-all active:scale-95 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            СОЗДАТЬ ЗАКАЗ / ПРИЕМКУ
          </button>
        </div>

        {/* Виджеты статистики */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Всего товаров</p>
            <p className="text-4xl font-black text-[#3A1C5F]">{loading ? "..." : totalQty} <span className="text-sm font-medium opacity-50">шт.</span></p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Активных SKU</p>
            <p className="text-4xl font-black text-[#3A1C5F]">{loading ? "..." : stocks.length}</p>
          </div>
        </div>

        {/* Таблица */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Товар</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Артикул / Код</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Остаток</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  [1,2,3].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-6"><div className="h-4 bg-slate-100 rounded w-48"></div></td>
                      <td className="px-6 py-6"><div className="h-4 bg-slate-100 rounded w-24"></div></td>
                      <td className="px-6 py-6"><div className="h-4 bg-slate-100 rounded w-12 ml-auto"></div></td>
                    </tr>
                  ))
                ) : stocks.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#3A1C5F]">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{item.code}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-3 py-1 rounded-full font-bold text-sm ${item.quantity > 0 ? 'bg-lime-100 text-lime-700' : 'bg-red-100 text-red-700'}`}>
                        {item.quantity} шт.
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
