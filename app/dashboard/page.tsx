"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import SalesChart from "@/components/dashboard/Charts/SalesChart";
import StockChart from "@/components/dashboard/Charts/StockChart";

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [stock, setStock] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then(r => r.json())
      .then(d => setOrders(d.data || []));

    fetch("/api/inventory")
      .then(r => r.json())
      .then(d => setStock(d.data || []));

    fetch("/api/products")
      .then(r => r.json())
      .then(d => setProducts(d.data || []));
  }, []);

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-black">Личный кабинет</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Заказы" value={orders.length} />
        <StatsCard title="Остатки" value={stock.length} />
        <StatsCard title="Товары" value={products.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart orders={orders} />
        <StockChart stock={stock} />
      </div>
    </div>
  );
}
