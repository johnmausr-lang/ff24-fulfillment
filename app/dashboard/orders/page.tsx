"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Clock, CheckCircle2, ChevronRight } from "lucide-react";

// Временное определение типа прямо в файле, чтобы не зависеть от внешних папок
interface MSOrder {
  id: string;
  name: string;
  moment: string;
  sum: number;
  state?: { name: string };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<MSOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/auth/check-user"); // Временно или ваш роут заказов
        const data = await res.json();
        if (data.rows) setOrders(data.rows);
      } catch (e) {
        console.error("Ошибка загрузки заказов");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black italic uppercase text-[#3A1C5F]">Мои заказы</h1>
        <Link 
          href="/dashboard/create-order"
          className="bg-[#D9FF00] text-[#3A1C5F] px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition"
        >
          + НОВЫЙ ЗАКАЗ
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-gray-100 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-slate-100 p-3 rounded-2xl text-[#3A1C5F]">
                  <Package size={24} />
                </div>
                <div>
                  <div className="font-bold text-lg">Заказ №{order.name}</div>
                  <div className="text-sm text-gray-500">{new Date(order.moment).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-black text-[#3A1C5F]">{(order.sum / 100).toLocaleString()} ₽</div>
                  <div className="text-xs uppercase font-bold text-green-600">{order.state?.name || "В работе"}</div>
                </div>
                <ChevronRight className="text-gray-300" />
              </div>
            </div>
          ))}
          {orders.length === 0 && <div className="text-center py-20 text-gray-400 font-medium">У вас пока нет активных заказов</div>}
        </div>
      )}
    </div>
  );
}
