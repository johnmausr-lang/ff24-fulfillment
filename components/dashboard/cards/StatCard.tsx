"use client";

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition">
      <div className="flex items-center justify-between">
        <h3 className="text-white/70 text-sm">{title}</h3>
        {Icon && <Icon className="w-5 h-5 text-white/40" />}
      </div>
      <div className="text-3xl font-semibold mt-2">{value}</div>
    </div>
  );
}
