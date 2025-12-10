"use client";

import { useEffect, useState } from "react";
import ProductSelector from "@/components/supply/ProductSelector";
import TruckButtonPrimary from "@/components/ui/buttons/TruckButtonPrimary";
import { toast } from "sonner";

export default function SupplyCreatePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitSupply() {
    if (products.length === 0) {
      toast.error("Добавьте хотя бы один товар");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/supply/create", {
      method: "POST",
      body: JSON.stringify({
        products: products.map((p) => ({
          meta: p.meta,
          qty: p.qty,
        })),
        comment,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      toast.error(data.error || "Ошибка создания приёмки");
      return;
    }

    toast.success("Приёмка успешно создана!");
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Создать приёмку товара</h1>

      {/* Выбор товаров */}
      <ProductSelector
        selected={products}
        onChange={setProducts}
      />

      {/* Комментарий */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <label className="font-semibold">Комментарий</label>
        <textarea
          className="w-full mt-2 p-3 border rounded-xl"
          rows={4}
          placeholder="Комментарий к поставке"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* Кнопка */}
      <TruckButtonPrimary onClick={submitSupply}>
        {loading ? "Отправка..." : "Создать приёмку"}
      </TruckButtonPrimary>
    </div>
  );
}
