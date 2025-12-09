// components/dashboard/Charts/StockChart.tsx

"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function StockChart({ stock }: { stock: any[] }) {
  const data = stock.slice(0, 20).map((s) => ({
    name: s.name,
    qty: s.stock || s.quantity || 0,
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border h-80">
      <h3 className="text-lg font-medium mb-3">Остатки товара</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="qty" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
