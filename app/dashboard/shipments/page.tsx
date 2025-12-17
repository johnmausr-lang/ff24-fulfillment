"use client";

import { Clock, Truck, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";

const shipments = [
  { id: "INB-5591", status: "В ПУТИ", date: "17.12.2023", items: 450, color: "text-blue-400" },
  { id: "INB-5582", status: "ПРИЕМКА", date: "16.12.2023", items: 120, color: "text-[#D9FF00]" },
  { id: "INB-5540", status: "ЗАВЕРШЕНО", date: "10.12.2023", items: 800, color: "text-slate-500" },
];

export default function ShipmentsPage() {
  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#1A0B2E] min-h-screen text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic uppercase text-white leading-none">История <span className="text-blue-400">Поставок</span></h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2 italic">Трекинг входящих грузов на склад</p>
        </div>
      </div>

      <div className="space-y-4">
        {shipments.map((s) => (
          <div key={s.id} className="bg-[#2A1445] p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-white/10 transition-all group">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className={`p-4 bg-white/5 rounded-2xl ${s.color}`}>
                <Truck size={32} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">ID Поставки</p>
                <h3 className="text-2xl font-black italic uppercase">{s.id}</h3>
              </div>
            </div>

            <div className="flex flex-1 justify-around w-full md:w-auto border-y md:border-y-0 md:border-x border-white/5 py-4 md:py-0">
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Дата</p>
                <p className="font-bold">{s.date}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Количество</p>
                <p className="font-bold text-[#D9FF00]">{s.items} ед.</p>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Статус</p>
                <p className={`font-black italic uppercase ${s.color}`}>{s.status}</p>
              </div>
              <button className="p-4 bg-white/5 rounded-xl group-hover:bg-[#D9FF00] group-hover:text-black transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
