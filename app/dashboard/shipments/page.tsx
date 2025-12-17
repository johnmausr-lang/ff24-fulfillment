"use client";
import { useEffect, useState } from 'react';

const getStatusProgress = (status: string) => {
  const steps: Record<string, number> = {
    "Новый": 10,
    "Принято": 30,
    "На проверке": 50,
    "Маркировка": 70,
    "Размещено на складе": 100,
    "Завершено": 100
  };
  return steps[status] || 5;
};

export default function ShipmentsPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/orders/list').then(res => res.json()).then(data => setOrders(data.orders));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-white">Мои поставки</h1>
      
      <div className="grid gap-6">
        {orders.map((order: any) => (
          <div key={order.id} className="bg-[#1A0B2E] border border-white/10 p-6 rounded-3xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#D9FF00]">{order.name}</h3>
                <p className="text-slate-400 text-sm">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <span 
                className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${order.statusColor}22`, color: order.statusColor, border: `1px solid ${order.statusColor}` }}
              >
                {order.status}
              </span>
            </div>

            {/* Прогресс-бар */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                <span>Оформление</span>
                <span>Приемка</span>
                <span>На складе</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#D9FF00] transition-all duration-1000"
                  style={{ width: `${getStatusProgress(order.status)}%`, boxShadow: '0 0 15px #D9FF00' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
