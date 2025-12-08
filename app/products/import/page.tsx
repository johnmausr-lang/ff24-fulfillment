// src/app/products/import/page.tsx
"use client";
import { TruckFullscreenLoader } from '@/components/ui/truck-fullscreen-loader';
import { Button } from '@/components/ui/button';
import { uploadProductsFromCsv } from '@/actions/products';
import { useState } from 'react';

export default function ImportProductsPage() {
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async (formData: FormData) => {
    setIsImporting(true);
    try {
      await uploadProductsFromCsv(formData);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Импорт товаров</h1>

        <form action={handleImport} className="space-y-6">
          <input type="file" name="file" accept=".csv" required className="block w-full" />
          <Button
            type="submit"
            disabled={isImporting}
            size="lg"
            className="bg-red-600 hover:bg-red-500"
          >
            {isImporting ? 'Импортируем...' : 'Загрузить CSV'}
          </Button>
        </form>
      </div>

      <TruckFullscreenLoader
        isLoading={isImporting}
        message="Импортируем 8 237 товаров в базу..."
      />
    </>
  );
}
