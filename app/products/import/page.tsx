"use client";

import { useState } from "react";
import { TruckFullscreenLoader } from "@/components/ui/truck-fullscreen-loader";
import { Button } from "@/components/ui/button";

export default function ImportProductsPage() {
  const [isImporting, setIsImporting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsImporting(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/products/import", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Import failed");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Импорт товаров</h1>
        <form onSubmit={handleImport} className="space-y-6">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full border rounded-md p-2"
            required
          />
          <Button
            type="submit"
            disabled={isImporting || !file}
            size="lg"
            className="bg-red-600 hover:bg-red-500"
          >
            {isImporting ? "Импортируем..." : "Загрузить CSV"}
          </Button>
        </form>
      </div>
      <TruckFullscreenLoader
        isLoading={isImporting}
        message="Импортируем товары..."
      />
    </>
  );
}
