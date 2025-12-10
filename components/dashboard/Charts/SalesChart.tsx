"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SalesChart({ data }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl h-80">
      <h3 className="text-white/70 mb-4">Динамика заказов</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="count" stroke="#FF6B00" strokeWidth={3} />
          <XAxis dataKey="day" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
