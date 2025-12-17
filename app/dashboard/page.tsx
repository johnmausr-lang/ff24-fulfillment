"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface StockItem {
  name: string;
  code: string;
  quantity: number;
  price: number;
}

export default function DashboardPage() {
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchStock() {
      try {
        const res = await fetch("/api/dashboard/stock");
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        if (res.ok) {
          setStocks(data.stocks);
        } else {
          toast.error(data.error || "Ошибка загрузки данных");
        }
      } catch (err) {
        toast.error("Не удалось подключиться к API");
      } finally {
        setLoading(false);
      }
    }
    fetchStock();
  }, [router]);

  const totalItems = stocks.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER */}
      <header className="bg-[#3A1C5F] sticky top-0 z-50 shadow-xl border-b-4 border-[#D9FF00]">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Image src="/logo-ff24.png" alt="FF24" width={140} height={50} className="brightness-200" />
          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
              <p className="text-[10px] text-[#D9FF00] font-black uppercase tracking-widest">Статус системы</p>
              <p className="text-white text-xs font-medium italic">Синхронизация с МойСклад: OK</p>
            </div>
            <button 
              onClick={() => { document.cookie = "token=; max-age=0; path=/"; router.push("/login"); }}
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all border border-white/20"
            >
              ВЫЙТИ
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        {/* ВЕРХНЯЯ ПАНЕЛЬ */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#3A1C5F] uppercase italic tracking-tighter">
              ТОВАРНЫЕ ОСТАТКИ
            </h1>
            <div className="h-1.5 w-24 bg-[#D9FF00] mt-2 rounded-full" />
          </div>
          
          <button className="group relative bg-[#D9FF00] hover:bg-[#3A1C5F] text-[#3A1C5F] hover:text-white font-black px-10 py-5 rounded-2xl transition-all duration-300 shadow-2xl shadow-lime-200 hover:shadow-purple-200 flex items-center gap-3 overflow-hidden">
            <span className="relative z-10 uppercase tracking-widest">Создать новую поставку</span>
            <svg className="w-6 h-6 relative z-10 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* ВИДЖЕТЫ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Всего единиц</p>
            <p className="text-5xl font-black text-[#3A1C5F] tabular-nums">
              {loading ? "..." : totalItems.toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Количество SKU</p>
            <p className="text-5xl font-black text-[#3A1C5F] tabular-nums">
              {loading ? "..." : stocks.length}
            </p>
          </div>
          <div className="bg-[#3A1C5F] p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <p className="text-[#D9FF00] text-[10px] font-black uppercase tracking-[0.2em] mb-3">Область</p>
            <p className="text-white text-2xl font-bold leading-tight">Склад: FF24 Основной</p>
          </div>
        </div>

        {/* ТАБЛИЦА */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Наименование товара</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Артикул / Код</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Доступно</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  [1,2,3,4].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-10 py-8"><div className="h-5 bg-slate-100 rounded-lg w-64"></div></td>
                      <td className="px-10 py-8"><div className="h-5 bg-slate-100 rounded-lg w-32"></div></td>
                      <td className="px-10 py-8"><div className="h-5 bg-slate-100 rounded-lg w-16 ml-auto"></div></td>
                    </tr>
                  ))
                ) : stocks.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-10 py-20 text-center text-slate-400 font-medium italic">Остатков пока нет. Оформите первую поставку!</td>
                  </tr>
                ) : stocks.map((item, idx) => (
                  <tr key={idx} className="group hover:bg-[#D9FF00]/5 transition-colors">
                    <td className="px-10 py-6 font-bold text-[#3A1C5F] text-lg">{item.name}</td>
                    <td className="px-10 py-6">
                      <span className="font-mono text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-md">{item.code}</span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="inline-flex items-center gap-3 bg-white border-2 border-slate-100 px-5 py-2 rounded-2xl shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#D9FF00] animate-pulse" />
                        <span className="text-xl font-black text-[#3A1C5F]">{item.quantity}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase">шт</span>
                      </div>
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
