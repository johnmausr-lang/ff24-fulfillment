"use client";

export default function StatsCard({ title, value }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </div>
  );
}
