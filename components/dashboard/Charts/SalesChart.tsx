"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SalesChart({ data }) {
  const gradientId = "ff24Gradient";

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl h-80 shadow-[0_0_25px_rgba(255,107,0,0.15)]">
      <h3 className="text-white/70 mb-4">Динамика заказов</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity={1} />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#333" strokeDasharray="5 5" />

          <XAxis dataKey="day" stroke="#777" />
          <YAxis stroke="#777" />

          <Tooltip
            contentStyle={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              backdropFilter: "blur(12px)",
            }}
          />

          <Line
            type="monotone"
            dataKey="count"
            stroke="url(#ff24Gradient)"
            strokeWidth={4}
            dot={false}
            activeDot={{
              r: 8,
              stroke: "#FF6B00",
              strokeWidth: 3,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
