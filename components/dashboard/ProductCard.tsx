"use client";

import { useCart } from "@/hooks/useCart";

export default function ProductCard({ product }: any) {
  const cart = useCart();

  return (
    <div className="bg-white rounded-lg shadow p-4 border">
      <h3 className="text-lg font-medium">{product.name}</h3>
      <p className="text-gray-500 text-sm">{product.code}</p>

      <p className="mt-3 text-lg font-semibold">
        {(product.salePrices?.[0]?.value || 0) / 100} ₽
      </p>

      <button
        onClick={() => cart.add(product)}
        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Добавить в корзину
      </button>
    </div>
  );
}
