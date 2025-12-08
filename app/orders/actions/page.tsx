// app/orders/actions/page.tsx
"use client";

import { useState } from "react";
import { TruckFullscreenLoader } from "@/components/ui/truck-fullscreen-loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createBatchOrdersInMoysklad } from "@/actions/orders";

export default function OrdersActionsPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Пример выбранных заказов — в реальности будет из таблицы/чекбоксов
  const selectedOrderIds = ["WB-123456", "OZ-789012", "YM-345678"];

  const handleSendToMoysklad = async () => {
    if (selectedOrderIds.length === 0) {
      toast({
        title: "Ничего не выбрано",
        description: "Выберите хотя бы один заказ",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      await createBatchOrdersInMoysklad(selectedOrderIds);

      toast({
        title: "Успех!",
        description: `Отправлено ${selectedOrderIds.length} заказов в МойСклад`,
      });
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось отправить заказы",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Массовые действия с заказами</h1>

        <div className="bg-card p-8 rounded-xl border shadow-sm">
          <div className="mb-6">
            <p className="text-lg text-muted-foreground">
              Выбрано заказов: <strong className="text-foreground">{selectedOrderIds.length}</strong>
            </p>
          </div>

          <Button
            onClick={handleSendToMoysklad}
            disabled={isProcessing || selectedOrderIds.length === 0}
            size="lg"
            className="bg-red-600 hover:bg-red-500 text-white font-semibold px-8"
          >
            {isProcessing
              ? `Отправляем ${selectedOrderIds.length} заказов...`
              : `Отправить ${selectedOrderIds.length} заказов в МойСклад`}
          </Button>
        </div>
      </div>

      {/* Наш легендарный грузовик */}
      <TruckFullscreenLoader
        isLoading={isProcessing}
        message={`Отправляем ${selectedOrderIds.length} заказов в МойСклад...`}
      />
    </>
  );
}
