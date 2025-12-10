"use client";

import { SupplyFormData } from "@/app/dashboard/supply/new/page";

interface Step3ConfirmProps {
  data: SupplyFormData;
  onBack: () => void;
}

export default function Step3Confirm({ data, onBack }: Step3ConfirmProps) {
  return (
    <div className="space-y-6 max-w-xl">
      <h2 className="text-2xl font-bold">3. Подтверждение</h2>

      <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
        <div>
          <div className="opacity-60 text-sm">Название</div>
          <div>{data.name}</div>
        </div>

        <div>
          <div className="opacity-60 text-sm">Артикул</div>
          <div>{data.article}</div>
        </div>

        {data.description && (
          <div>
            <div className="opacity-60 text-sm">Описание</div>
            <div>{data.description}</div>
          </div>
        )}

        {data.packagingType && (
          <div>
            <div className="opacity-60 text-sm">Тип упаковки</div>
            <div>{data.packagingType}</div>
          </div>
        )}

        {data.quantity && (
          <div>
            <div className="opacity-60 text-sm">Количество</div>
            <div>{data.quantity}</div>
          </div>
        )}

        {data.comment && (
          <div>
            <div className="opacity-60 text-sm">Комментарий</div>
            <div>{data.comment}</div>
          </div>
        )}

        {data.imagePreview && (
          <img
            src={data.imagePreview}
            alt="preview"
            className="w-32 h-32 rounded-lg object-cover border border-white/10"
          />
        )}
      </div>

      <button
        onClick={onBack}
        className="px-6 py-3 bg-gray-600 rounded-xl hover:bg-gray-500 transition"
      >
        ← Назад
      </button>
    </div>
  );
}
