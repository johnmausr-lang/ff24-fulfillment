"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/dashboard/ProductCard";
import CartSidebar from "@/components/dashboard/CartSidebar";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(d => setProducts(d.data || []));
  }, []);

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-6">Товары</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <CartSidebar />
    </div>
  );
}
