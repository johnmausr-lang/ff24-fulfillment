"use client";

import { useEffect, useState } from "react";

export default function ProductSelector({ selected, onChange }: any) {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setAllProducts(data.data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function toggleProduct(p: any) {
    const exists = selected.find((s: any) => s.id === p.id);

    if (exists) {
      onChange(selected.filter((s: any) => s.id !== p.id));
    } else {
      onChange([
        ...selected,
        {
          id: p.id,
          meta: p.meta,
          name: p.name,
          qty: 1,
        },
      ]);
    }
  }

  function updateQty(id: string, qty: number) {
    onChange(
      selected.map((p: any) =>
        p.id === id ? { ...p, qty: qty } : p
      )
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Товары
      </h2>

      {loading && <p>Загрузка товаров...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allProducts.map((p) => {
          const isSelected = selected.find((s: any) => s.id === p.id);

          return (
            <div
              key={p.id}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                isSelected
                  ? "bg-orange-50 border-orange-400 shadow-md"
                  : "bg-gray-50"
              }`}
              onClick={() => toggleProduct(p)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">{p.name}</p>
                </div>
              </div>

              {isSelected && (
                <div className="mt-3">
                  <label className="text-sm">Количество</label>
                  <input
                    type="number"
                    min={1}
                    className="w-24 p-2 border rounded-lg ml-2"
                    value={isSelected.qty}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      updateQty(p.id, Number(e.target.value))
                    }
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
