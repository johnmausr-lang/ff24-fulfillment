"use client";

import { FileText, Download, BarChart3, Calendar, Search } from "lucide-react";
import { motion } from "framer-motion";

const reports = [
  { id: "REP-001", name: "Акт приемки №452", date: "15.12.2023", type: "PDF", size: "1.2 MB" },
  { id: "REP-002", name: "Отчет по остаткам (мес)", date: "01.12.2023", type: "XLSX", size: "450 KB" },
  { id: "REP-003", name: "Реестр отгрузок на WB", date: "28.11.2023", type: "PDF", size: "2.1 MB" },
];

export default function ReportsPage() {
  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#1A0B2E] min-h-screen text-white">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic uppercase text-[#D9FF00] leading-none">Отчетность</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2 italic">Документы и аналитика по складу</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-[#2A1445] p-6 rounded-[2rem] border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#D9FF00]/10 rounded-xl flex items-center justify-center text-[#D9FF00]"><FileText /></div>
          <div>
            <p className="text-2xl font-black">12</p>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Документов за месяц</p>
          </div>
        </div>
      </div>

      {/* Список отчетов */}
      <div className="bg-[#2A1445] rounded-[3rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <h3 className="font-black italic uppercase text-lg">Архив документов</h3>
           <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
             <input className="bg-[#1A0B2E] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-[#D9FF00]" placeholder="Поиск документа..." />
           </div>
        </div>
        
        <div className="divide-y divide-white/5">
          {reports.map((report, i) => (
            <motion.div 
              key={report.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
              className="p-6 hover:bg-white/[0.02] flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-slate-400 group-hover:text-[#D9FF00] transition-colors"><FileText size={20} /></div>
                <div>
                  <p className="font-bold uppercase italic text-sm">{report.name}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{report.date} • {report.size}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-[#D9FF00] hover:text-[#1A0B2E] px-4 py-2 rounded-xl transition-all text-[10px] font-black uppercase italic">
                {report.type} <Download size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
