"use client";

import { useState } from "react";

import Step1Product from "@/components/supply/Step1Product";
import Step2Sizes from "@/components/supply/Step2Sizes";
import Step3Works from "@/components/supply/Step3Works";
import Step4Preview from "@/components/supply/Step4Preview";
import Step5Finish from "@/components/supply/Step5Finish";

export default function NewSupplyPage() {
  const [step, setStep] = useState(1);

  // Общие данные поставки
  const [data, setData] = useState({
    brand: "",
    model: "",
    color: "",
    description: "",
    image: null,
    imagePreview: null,
    sizes: [],
    services: []
  });

  const [supplyId, setSupplyId] = useState(null);

  // Навигация
  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  // Финальная отправка
  async function createSupply() {
    const form = new FormData();
    form.append("data", JSON.stringify(data));
    if (data.image) form.append("image", data.image);

    const res = await fetch("/api/supply/create", {
      method: "POST",
      body: form
    });

    const json = await res.json();

    if (json.success) {
      setSupplyId(json.supplyId);
      setStep(5);
    } else {
      alert("Ошибка создания поставки: " + json.error);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {step === 1 && (
        <Step1Product
          data={data}
          onChange={(v) => {
            // передаём также превью фото
            if (v.image) {
              v.imagePreview = URL.createObjectURL(v.image);
            }
            setData(v);
          }}
          onNext={next}
        />
      )}

      {step === 2 && (
        <Step2Sizes
          data={data}
          onChange={(v) => setData(v)}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 3 && (
        <Step3Works
          data={data}
          onChange={(v) => setData(v)}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 4 && (
        <Step4Preview
          data={data}
          onNext={createSupply}
          onBack={back}
        />
      )}

      {step === 5 && (
        <Step5Finish supplyId={supplyId} />
      )}
    </div>
  );
}
