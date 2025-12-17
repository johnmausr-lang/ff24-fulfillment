"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";

const data = [
  { name: 'Пн', sales: 4000, orders: 24 },
  { name: 'Вт', sales: 3000, orders: 18 },
  { name: 'Ср', sales: 2000, orders: 29 },
  { name: 'Чт', sales: 2780, orders: 23 },
  { name: 'Пт', sales: 1890, orders: 15 },
  { name: 'Сб', sales: 2390, orders: 21 },
  { name: 'Вс', sales: 3490, orders: 30 },
];

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-black italic uppercase text-[#3A1C5F]">Аналитика продаж</h1>
      
      {/* Сводка */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Выручка", value: "450,000 ₽", icon: <DollarSign />, color: "text-green-500" },
          { label: "Заказы", value: "156", icon: <ShoppingBag />, color: "text-blue-500" },
          { label: "Возвраты", value: "3", icon: <TrendingUp />, color: "text-red-500" },
          { label: "Клиенты", value: "89", icon: <Users />, color: "text-[#3A1C5F]" },
        ].map((stat, i) => (
          <Card key={i} className="p-6 rounded-[2rem] border-none shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase">{stat.label}</p>
                <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 bg-slate-50 rounded-2xl ${stat.color}`}>{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* График */}
      <Card className="p-8 rounded-[3rem] border-none shadow-md overflow-hidden bg-white">
        <h3 className="text-xl font-black italic uppercase mb-8 text-[#3A1C5F]">Динамика за неделю</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis hide />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="sales" fill="#3A1C5F" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
