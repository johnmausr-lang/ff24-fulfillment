"use client";

import { useState } from "react";
import Step1Product, { Step1Data } from "@/components/supply/Step1Product";
import Step2Packaging from "@/components/supply/Step2Packaging";
import Step3Confirm from "@/components/supply/Step3Confirm";

export interface SupplyFormData extends Step1Data {
  packagingType?: string;
  quantity?: number;
  comment?: string;
}

export default function SupplyCreatePage() {
  const [step, setStep] = useState(1);

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

  function next(newData: Partial<SupplyFormData>) {
    setData((prev) => ({ ...prev, ...newData }));
    setStep((s) => s + 1);
  }

  function back() {
    setStep((s) => s - 1);
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-10">

      <h1 className="text-3xl font-bold">Создать приёмку</h1>

      {/* Прогресс */}
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-orange-500" : "bg-gray-600"}`}>1</div>
        <div className="h-[2px] flex-1 bg-gray-600" />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-orange-500" : "bg-gray-600"}`}>2</div>
        <div className="h-[2px] flex-1 bg-gray-600" />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-orange-500" : "bg-gray-600"}`}>3</div>
      </div>

      {/* Шаги */}
      {step === 1 && <Step1Product data={data} onNext={next} />}

      {step === 2 && (
        <Step2Packaging
          data={data}
          onNext={next}   // <— БЕЗ ЛЯМБДА! ТАК НУЖНО!
          onBack={back}
        />
      )}

      {step === 3 && (
        <Step3Confirm
          data={data}
          onBack={back}
        />
      )}
    </div>
  );
}
