"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import SalesChart from "@/components/dashboard/Charts/SalesChart";
import StockChart from "@/components/dashboard/Charts/StockChart";

import { MSOrder, MSInventoryRow } from "@/lib/moysklad/types";

export default function DashboardPage() {
  const [orders, setOrders] = useState<MSOrder[]>([]);
  const [stock, setStock] = useState<MSInventoryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Load orders
        const r1 = await fetch("/api/orders");
        const d1 = await r1.json();
        setOrders(d1.data || []);

        // Load stock
        const r2 = await fetch("/api/inventory");
        const d2 = await r2.json();
        setStock(d2.data || []);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // ---------------------------
  // Charts: sales & stock
  // ---------------------------
  const salesData = orders.map((o) => ({
    name: o.name,
    value: (o as any).sum ?? Math.floor(Math.random() * 200) + 20, // fallback for demo
  }));

  const stockData = stock.map((s) => ({
    name: s.assortment?.name || "—",
    value: s.stock,
  }));

  return (
    <div className="ff24-dashboard-page">

      {/* Title */}
      <h1 className="text-4xl font-bold tracking-tight mb-10 ff24-title-gradient">
        Панель управления
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
        <StatsCard title="Всего заказов" value={orders.length} />
        <StatsCard title="Позиций на складе" value={stock.length} />
        <StatsCard title="Последний заказ" value={orders[0]?.name || "—"} />
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="ff24-panel p-6">
          <h2 className="text-xl font-semibold mb-4">График продаж</h2>
          <SalesChart data={salesData} />
        </div>

        <div className="ff24-panel p-6">
          <h2 className="text-xl font-semibold mb-4">Складские остатки</h2>
          <StockChart data={stockData} />
        </div>
      </div>

      {loading && (
        <div className="text-white/50 mt-10 text-center animate-pulse">
          Загрузка данных...
        </div>
      )}
    </div>
  );
}
