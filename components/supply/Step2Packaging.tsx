"use client";

import { useState } from "react";
import { SupplyFormData } from "@/app/dashboard/supply/new/page";

interface Step2PackagingProps {
  data: SupplyFormData;
  onNext: (updated: Partial<SupplyFormData>) => void;
  onBack: () => void;
}

export default function Step2Packaging({
  data,
  onNext,
  onBack,
}: Step2PackagingProps) {
  const [local, setLocal] = useState({
    packagingType: data.packagingType || "",
    quantity: data.quantity || 1,
    comment: data.comment || "",
  });

  function update(field: keyof typeof local, value: any) {
    setLocal((prev) => ({ ...prev, [field]: value }));
  }

  function handleNext() {
    onNext(local);
  }

  return (
    <div className="space-y-6 max-w-xl">
      <h2 className="text-2xl font-bold">2. Упаковка</h2>

      <div className="space-y-2">
        <label className="text-sm opacity-70">Тип упаковки</label>
        <input
          type="text"
          value={local.packagingType}
          onChange={(e) => update("packagingType", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm opacity-70">Количество</label>
        <input
          type="number"
          value={local.quantity}
          onChange={(e) => update("quantity", Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm opacity-70">Комментарий</label>
        <textarea
          value={local.comment}
          onChange={(e) => update("comment", e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 min-h-[120px]"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-gray-600 hover:bg-gray-500 transition"
        >
          ← Назад
        </button>

        <button
          onClick={handleNext}
          className="px-6 py-3 rounded-xl bg-orange-500 text-black font-semibold hover:opacity-80 transition"
        >
          Далее →
        </button>
      </div>
    </div>
  );
}
