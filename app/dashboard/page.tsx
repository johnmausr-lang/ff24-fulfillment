"use client";

import StatCard from "@/components/dashboard/cards/StatCard";
import SalesChart from "@/components/dashboard/Charts/SalesChart";
import StockChart from "@/components/dashboard/Charts/StockChart";

import { Package, Boxes, FileCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    fetch("/api/orders").then(r => r.json()).then(d => setOrders(d.data || []));
    fetch("/api/inventory").then(r => r.json()).then(d => setStock(d.data || []));
  }, []);

  return (
    <div className="space-y-10">

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Заказы" value={orders.length} icon={Package} />
        <StatCard title="Остатки" value={stock.length} icon={Boxes} />
        <StatCard title="Активных поставок" value={3} icon={FileCheck} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <SalesChart data={orders.map((o, i) => ({ day: i + 1, count: 1 }))} />
        <StockChart data={stock} />
      </div>

    </div>
  );
}
