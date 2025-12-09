// app/orders/actions/page.tsx
"use client";

import { useState } from "react";
import { TruckFullscreenLoader } from "@/components/ui/truck-fullscreen-loader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // ← ИМЕННО SONNER, НЕ use-toast!

export default function OrdersActionsPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  // Пример выбранных заказов
  const selectedOrderIds = ["WB-123456", "OZ-789012"];

  const handleSendToMoysklad = async () => {
    if (!selectedOrderIds.length) {
      toast.error("Выберите хотя бы один заказ");
      return;
    }

    setIsProcessing(true);

    try {
      // Здесь будет реальная отправка через ms-client
      await new Promise(r => setTimeout(r, 3000)); // имитация

      toast.success(`Отправлено ${selectedOrderIds.length} заказов в МойСклад`);
    } catch (error) {
      toast.error("Ошибка отправки заказов");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Массовые действия</h1>

        <div className="bg-card p-8 rounded-xl border shadow-sm">
          <p className="text-lg text-muted-foreground mb-6">
            Выбрано заказов: <strong className="text-foreground">{selectedOrderIds.length}</strong>
          </p>

          <Button
            onClick={handleSendToMoysklad}
            disabled={isProcessing}
            size="lg"
            className="bg-red-600 hover:bg-red-500 text-white font-semibold px-8"
          >
            {isProcessing ? "Отправляем..." : "Отправить в МойСклад"}
          </Button>
        </div>
      </div>

      <TruckFullscreenLoader
        isLoading={isProcessing}
        message={`Отправляем ${selectedOrderIds.length} заказов...`}
      />
    </>
  );
}
