"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function StockChart({ data }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl h-80 shadow-[0_0_25px_rgba(107,0,255,0.2)]">
      <h3 className="text-white/70 mb-4">Остатки товара</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="#333" strokeDasharray="4 4" />

          <XAxis dataKey="assortment.name" stroke="#777" />
          <YAxis stroke="#777" />

          <Tooltip
            contentStyle={{
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(12px)",
            }}
          />

          <Bar
            dataKey="stock"
            fill="#8A2EFF"
            radius={[8, 8, 0, 0]}
            opacity={0.9}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
