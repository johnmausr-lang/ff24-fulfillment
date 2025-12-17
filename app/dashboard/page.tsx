"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Boxes, 
  Truck, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

// Моковые данные для графика движения товара
const chartData = [
  { name: '01.12', in: 400, out: 240 },
  { name: '05.12', in: 300, out: 139 },
  { name: '10.12', in: 200, out: 980 },
  { name: '15.12', in: 278, out: 390 },
  { name: '20.12', in: 189, out: 480 },
];

export default function DashboardPage() {
  const [stats, setStats] = useState({
    inbound_total: 0,
    in_stock: 0,
    active_shipments: 0
  });

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#1A0B2E] min-h-screen text-white">
      {/* Заголовок */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic uppercase text-white leading-none">
            Обзор <span className="text-[#D9FF00]">Склада</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2 italic">
            Оперативные данные фулфилмента FF24
          </p>
        </div>
        <Link href="/dashboard/create-order">
          <button className="bg-[#D9FF00] text-[#1A0B2E] font-black py-4 px-8 rounded-2xl text-sm uppercase italic hover:scale-105 transition-all shadow-[0_0_30px_rgba(217,255,0,0.2)]">
            + Создать поставку
          </button>
        </Link>
      </div>

      {/* Карточки показателей */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Товаров в наличии", value: stats.in_stock, icon: <Boxes />, color: "text-[#D9FF00]" },
          { label: "Ожидается приемка", value: stats.inbound_total, icon: <Truck />, color: "text-blue-400" },
          { label: "Активные заявки", value: stats.active_shipments, icon: <Clock />, color: "text-purple-400" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-[#2A1445] border-white/5 p-6 rounded-[2.5rem] relative overflow-hidden group">
              <div className={`absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity ${item.color}`}>
                 {item.icon}
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">{item.label}</p>
              <div className="flex items-end gap-2">
                <h3 className="text-4xl font-black italic">{item.value.toLocaleString()}</h3>
                <span className="text-[10px] font-bold text-slate-500 mb-2 uppercase">ед.</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* График динамики */}
        <Card className="lg:col-span-2 bg-[#2A1445] border-white/5 p-8 rounded-[3rem] shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black italic uppercase flex items-center gap-2">
              <TrendingUp className="text-[#D9FF00]" size={20} /> Движение стока
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D9FF00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D9FF00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#1A0B2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px'}}
                  itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="in" stroke="#D9FF00" fillOpacity={1} fill="url(#colorIn)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Последние заявки (Inbound из вашей модели) */}
        <Card className="bg-[#2A1445] border-white/5 p-8 rounded-[3rem] shadow-2xl">
          <h3 className="text-xl font-black italic uppercase mb-6 flex items-center gap-2">
            <Clock className="text-blue-400" size={20} /> Поставки
          </h3>
          <div className="space-y-4">
            {[
              { id: "ORD-992", date: "Сегодня", status: "Приемка", items: 120 },
              { id: "ORD-854", date: "Вчера", status: "Ожидание", items: 450 },
              { id: "ORD-721", date: "20 дек", status: "Завершено", items: 80 },
            ].map((order, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
                <div>
                  <p className="text-[10px] font-black text-[#D9FF00] uppercase mb-1">{order.id}</p>
                  <p className="font-bold text-sm uppercase italic">{order.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-white">{order.items} ед.</p>
                  <p className="text-[10px] text-slate-500 uppercase">{order.date}</p>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-white ml-2" />
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest hover:text-[#D9FF00] transition-colors border-t border-white/5">
            Смотреть всю историю
          </button>
        </Card>
      </div>
    </div>
  );
}
