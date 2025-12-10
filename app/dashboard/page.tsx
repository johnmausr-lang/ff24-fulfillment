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
        // Fetch orders
        const rOrders = await fetch("/api/orders");
        const dOrders = await rOrders.json();
        setOrders(dOrders.data || []);

        // Fetch inventory
        const rStock = await fetch("/api/inventory");
        const dStock = await rStock.json();
        setStock(dStock.data || []);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // ---------------------------
  // Создаем корректные данные для графика продаж
  // ---------------------------
  const salesChartData = orders.map((o) => ({
    name: o.name,
    value: (o as any).sum ?? 0, // если API не отдаёт sum – подставляем 0
  }));

  // ---------------------------
  // Данные для графика остатков
  // ---------------------------
  const stockChartData = stock.map((row) => ({
    name: row.assortment?.name || "—",
    value: row.stock,
  }));

  return (
    <div className="space-y-10">

      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Всего заказов"
          value={orders.length}
        />
        <StatsCard
          title="Позиций на складе"
          value={stock.length}
        />
        <StatsCard
          title="Последний заказ"
          value={orders[0]?.name || "—"}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SalesChart data={salesChartData} />
        <StockChart data={stockChartData} />
      </div>
    </div>
  );
}
