// app/dashboard/page.tsx

"use client";

import StatsCard from "@/components/dashboard/StatsCard";
import SalesChart from "@/components/dashboard/Charts/SalesChart";
import StockChart from "@/components/dashboard/Charts/StockChart";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stock, setStock] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((d) => setOrders(d.data || []));

    fetch("/api/inventory")
      .then((r) => r.json())
      .then((d) => setStock(d.data || []));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Личный кабинет</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Всего заказов" value={orders.length} />
        <StatsCard title="Позиций на складе" value={stock.length} />
        <StatsCard title="Последний заказ" value={orders[0]?.name || "—"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart orders={orders} />
        <StockChart stock={stock} />
      </div>
    </div>
  );
}
