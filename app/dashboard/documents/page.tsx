"use client";

import { useState, useEffect } from 'react';
import { FileText, Download, Search, Calendar } from 'lucide-react';

export default function DocumentsPage() {
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Загружаем список приемок (supply) для текущего клиента
    fetch('/api/orders/list-supplies') // Мы создадим этот роут ниже или объединим с заказами
      .then(res => res.json())
      .then(data => {
        setSupplies(data.supplies || []);
        setLoading(false);
      });
  }, []);

  const downloadPDF = (id: string) => {
    window.open(`/api/reports/download?id=${id}`, '_blank');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter">
            Архив <span className="text-[#D9FF00]">Документов</span>
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">
            Акты приемки и складские отчеты
          </p>
        </div>
      </div>

      <div className="bg-[#1A0B2E] border border-white/10 rounded-[2rem] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">
              <th className="p-6">Дата</th>
              <th className="p-6">Номер документа</th>
              <th className="p-6">Сумма</th>
              <th className="p-6 text-right">Действие</th>
            </tr>
          </thead>
          <tbody className="text-white/80">
            {supplies.length > 0 ? supplies.map((doc: any) => (
              <tr key={doc.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors group">
                <td className="p-6 font-medium">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-[#D9FF00]" />
                    {new Date(doc.moment).toLocaleDateString()}
                  </div>
                </td>
                <td className="p-6 font-bold">Приемка №{doc.name}</td>
                <td className="p-6 text-[#D9FF00] font-black italic">{(doc.sum / 100).toLocaleString()} ₽</td>
                <td className="p-6 text-right">
                  <button 
                    onClick={() => downloadPDF(doc.id)}
                    className="inline-flex items-center gap-2 bg-[#D9FF00] text-black text-[10px] font-black uppercase px-4 py-2 rounded-xl hover:shadow-[0_0_15px_#D9FF00] transition-all"
                  >
                    <Download size={14} /> Скачать PDF
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="p-20 text-center text-slate-500 font-bold uppercase text-xs tracking-widest">
                  {loading ? "Загрузка архива..." : "Документы пока не сформированы"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
