"use client";

import { useEffect, useState } from "react";
import { FileText, Download, Loader2, Calendar, FileSearch } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => {
        setReports(data.reports || []);
        setLoading(false);
      })
      .catch(() => toast.error("Ошибка загрузки архива"));
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#1A0B2E] min-h-screen text-white">
      <div>
        <h1 className="text-4xl font-black italic uppercase leading-none">
          Документы <span className="text-[#D9FF00]">&</span> Отчеты
        </h1>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2 italic">
          Архив актов приемки и складских ведомостей
        </p>
      </div>

      <div className="bg-[#2A1445] rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 bg-black/20">
          <h3 className="font-black italic uppercase flex items-center gap-2">
            <FileSearch size={20} className="text-[#D9FF00]" /> История документов
          </h3>
        </div>

        <div className="divide-y divide-white/5">
          {loading ? (
            <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-[#D9FF00]" /></div>
          ) : reports.length === 0 ? (
            <div className="p-20 text-center text-slate-500 uppercase font-bold italic tracking-widest">Документы не найдены</div>
          ) : (
            reports.map((report: any) => (
              <div key={report.id} className="p-8 flex flex-col md:flex-row items-center justify-between hover:bg-white/[0.02] transition-all group">
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className="w-14 h-14 bg-[#1A0B2E] rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-[#D9FF00] transition-colors border border-white/5">
                    <FileText size={28} />
                  </div>
                  <div>
                    <h4 className="font-black italic uppercase text-lg leading-none mb-2">{report.name}</h4>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {report.date}</span>
                      <span>Сумма: {report.sum} ₽</span>
                    </div>
                  </div>
                </div>

                <a 
                  href={report.downloadUrl}
                  target="_blank"
                  className="w-full md:w-auto bg-white/5 hover:bg-[#D9FF00] hover:text-[#1A0B2E] px-8 py-4 rounded-2xl font-black uppercase italic text-xs transition-all flex items-center justify-center gap-2"
                >
                  Скачать PDF <Download size={16} />
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
