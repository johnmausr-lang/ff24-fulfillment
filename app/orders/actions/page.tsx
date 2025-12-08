"use client";

import { useState } from "react";
import { TruckFullscreenLoader } from "@/components/ui/truck-fullscreen-loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createBatchOrdersInMoysklad } from "@/actions/orders";

export default function OrdersActionsPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const selectedOrderIds = ["1001", "1002", "1003"]; // Твоя логика выбора

  const handleSendToMoysklad = async () => {
    if (selectedOrderIds.length === 0) return;

    setIsProcessing(true);
    try {
      await createBatchOrdersInMoysklad(selectedOrderIds);
      toast({
        title: "Готово!",
        description: `Отправлено ${selectedOrderIds.length} заказов в МойСклад`,
      });
    } catch (err: any) {
      toast({
        title: "Ошибка",
        description: err.message || "Не удалось отправить",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Массовые действия</h1>
        <div className="bg-card p-6 rounded-xl border">
          <p className="text-muted-foreground mb-6">
            Выбрано: <strong>{selectedOrderIds.length}</strong>
          </p>
          <Button
            onClick={handleSendToMoysklad}
            disabled={isProcessing || selectedOrderIds.length === 0}
            size="lg"
            className="bg-red-600 hover:bg-red-500"
          >
            {isProcessing
              ? `Отправляем ${selectedOrderIds.length}...`
              : `Отправить ${selectedOrderIds.length} в МойСклад`}
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
