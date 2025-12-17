"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  CheckCircle2, 
  Clock, 
  FileDown, 
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

export default function HistoryPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/timeline')
      .then(res => res.json())
      .then(data => {
        setEvents(data.timeline || []);
        setLoading(false);
      });
  }, []);

  const downloadPDF = (id: string) => {
    window.open(`/api/reports/download?id=${id}`, '_blank');
  };

  if (loading) return <div className="p-10 text-[#D9FF00] animate-pulse">Загрузка истории...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter">
          Лента <span className="text-[#D9FF00]">Событий</span>
        </h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">
          Отслеживание ваших поставок в реальном времени
        </p>
      </header>

      <div className="relative border-l-2 border-white/5 ml-4 pl-8 space-y-12">
        {events.map((event: any, index: number) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Иконка на линии */}
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#0F051D] border-2 border-[#D9FF00] shadow-[0_0_10px_#D9FF00]" />

            <div className="bg-[#1A0B2E] border border-white/10 rounded-[2rem] p-6 hover:border-[#D9FF00]/30 transition-all group">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${event.type === 'supply' ? 'bg-green-500/10 text-green-500' : 'bg-[#D9FF00]/10 text-[#D9FF00]'}`}>
                    {event.type === 'supply' ? <CheckCircle2 size={24} /> : <Package size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        {new Date(event.date).toLocaleDateString()} в {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#D9FF00] transition-colors">
                      {event.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right mr-4">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Сумма</p>
                    <p className="text-lg font-black italic text-white">{event.sum.toLocaleString()} ₽</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${
                    event.type === 'supply' ? 'border-green-500/50 text-green-500' : 'border-[#D9FF00]/50 text-[#D9FF00]'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>

              {/* Футер карточки с действиями */}
              <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                <p className="text-xs text-slate-400 max-w-md">
                  {event.type === 'supply' 
                    ? "Товары успешно приняты на склад и размещены в ячейках хранения." 
                    : "Заявка получена фулфилментом. Ожидаем прибытия товара на склад."}
                </p>
                
                {event.type === 'supply' ? (
                  <button 
                    onClick={() => downloadPDF(event.id)}
                    className="flex items-center gap-2 bg-white text-black text-[10px] font-black uppercase px-6 py-3 rounded-xl hover:bg-[#D9FF00] transition-all"
                  >
                    <FileDown size={14} /> Скачать Акт приемки
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-[#D9FF00] text-[10px] font-black uppercase">
                    В обработке <Clock size={14} className="animate-spin-slow" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
