"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SalesChartPoint {
  name: string;
  value: number;
}

export default function SalesChart({ data }: { data: SalesChartPoint[] }) {
  const gradientId = "ff24Gradient";

  return (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
      <h2 className="text-xl font-semibold mb-4">Продажи</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity={1} />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#FF6B00"
            strokeWidth={3}
            dot={false}
            fill={`url(#${gradientId})`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
