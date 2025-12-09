// components/dashboard/Charts/SalesChart.tsx

"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SalesChart({ orders }: { orders: any[] }) {
  const data = orders.map((o) => ({
    name: o.name || "Заказ",
    value: o.sum || 0,
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border h-80">
      <h3 className="text-lg font-medium mb-3">График заказов</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
