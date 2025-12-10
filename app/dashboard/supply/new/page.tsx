"use client";

import { useState } from "react";
import Step1Product from "@/components/supply/Step1Product";
import Step2Packaging from "@/components/supply/Step2Packaging";
import Step3Confirm from "@/components/supply/Step3Confirm";

interface SupplyFormData {
  productName: string;
  article: string;
  qty: string;
  image: File | null;
  imagePreview: string;

  packaging: string;
  marking: boolean;
  places: string;
  comment: string;
}

export default function SupplyWizardPage() {
  const [step, setStep] = useState(1);

  const [data, setData] = useState<SupplyFormData>({
    productName: "",
    article: "",
    qty: "",
    image: null,
    imagePreview: "",

    packaging: "",
    marking: false,
    places: "",
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
    <div className="space-y-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white">Новая поставка</h1>

      <div className="flex items-center gap-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm
              ${step === s
                ? "bg-[#FF6B00] text-black shadow-[0_0_20px_rgba(255,107,0,0.6)]"
                : "bg-white/10 text-white/50"}
            `}
          >
            {s}
          </div>
        ))}
      </div>

      {step === 1 && <Step1Product data={data} onNext={next} />}
      {step === 2 && <Step2Packaging data={data} onNext={next} onBack={back} />}
      {step === 3 && <Step3Confirm data={data} onBack={back} />}
    </div>
  );
}
