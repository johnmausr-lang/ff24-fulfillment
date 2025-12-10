"use client";

import { useState } from "react";
import Step1Product, { Step1Data } from "@/components/supply/Step1Product";
import Step2Packaging from "@/components/supply/Step2Packaging";
import Step3Confirm from "@/components/supply/Step3Confirm";

/**
 * SupplyFormData = Step1Data + данные следующих шагов
 */
export interface SupplyFormData extends Step1Data {
  packagingType?: string;
  quantity?: number;
  comment?: string;
}

export default function SupplyCreatePage() {
  const [step, setStep] = useState(1);

  /** Полный объект данных формы */
  const [data, setData] = useState<SupplyFormData>({
    name: "",
    article: "",
    description: "",
    image: null,
    imagePreview: null,

    packagingType: "",
    quantity: 1,
    comment: "",
  });

  /** Переход вперёд + обновление данных */
  function next(newData: Partial<SupplyFormData>) {
    setData((prev) => ({ ...prev, ...newData }));
    setStep((s) => s + 1);
  }

  /** Переход назад */
  function back() {
    setStep((s) => s - 1);
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-10">

      <h1 className="text-3xl font-bold">Создать приёмку</h1>

      {/* ПРОГРЕСС-СТРИП */}
      <div className="flex items-center gap-4">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1 ? "bg-orange-500" : "bg-gray-600"
          }`}
        >
          1
        </div>

        <div className="flex-1 h-[2px] bg-gray-600" />

        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2 ? "bg-orange-500" : "bg-gray-600"
          }`}
        >
          2
        </div>

        <div className="flex-1 h-[2px] bg-gray-600" />

        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 3 ? "bg-orange-500" : "bg-gray-600"
          }`}
        >
          3
        </div>
      </div>

      {/* ШАГ 1 – Информация о товаре */}
      {step === 1 && (
        <Step1Product
          data={data}
          onNext={(updated) => next(updated)}
        />
      )}

      {/* ШАГ 2 – Упаковка */}
      {step === 2 && (
        <Step2Packaging
          data={data}
          onNext={(updated) => next(updated)}
          onBack={back}
        />
      )}

      {/* ШАГ 3 – Подтверждение */}
      {step === 3 && (
        <Step3Confirm
          data={data}
          onBack={back}
        />
      )}
    </div>
  );
}
