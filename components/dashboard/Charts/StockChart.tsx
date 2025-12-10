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

interface StockPoint {
  name: string;
  value: number;
}

export default function StockChart({ data }: { data: StockPoint[] }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl h-80 shadow-[0_0_25px_rgba(107,0,255,0.25)]">
      <h3 className="text-white/70 mb-4">Остатки по товарам</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="#333" strokeDasharray="4 4" />
          <XAxis dataKey="name" stroke="#777" />
          <YAxis stroke="#777" />

          <Tooltip
            contentStyle={{
              background: "rgba(0,0,0,0.65)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 12,
              backdropFilter: "blur(14px)",
            }}
          />

          <Bar
            dataKey="value"
            fill="#8A2EFF"
            radius={[10, 10, 0, 0]}
            opacity={0.95}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
