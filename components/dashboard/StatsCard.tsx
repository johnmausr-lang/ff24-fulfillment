"use client";

import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  hint?: string;
}

export default function StatsCard({ title, value, icon, hint }: StatsCardProps) {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        p-5
        shadow-[0_0_30px_rgba(0,0,0,0.45)]
        hover:shadow-[0_0_45px_rgba(255,107,0,0.35)]
        transition
      "
    >
      {/* Светящийся градиент в углу */}
      <div
        className="
          pointer-events-none
          absolute -top-8 -right-8 w-28 h-28
          bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.7),transparent)]
          opacity-60
        "
      />

      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-xs uppercase tracking-wide text-white/50">
            {title}
          </div>
          {hint && (
            <div className="text-[11px] text-white/40 mt-1">
              {hint}
            </div>
          )}
        </div>
        {icon && <div className="text-white/60">{icon}</div>}
      </div>

      <div className="text-3xl font-semibold mt-2">{value}</div>
    </div>
  );
}
