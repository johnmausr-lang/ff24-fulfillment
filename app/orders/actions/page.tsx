// app/orders/actions/page.tsx — финальная версия БЕЗ actions/orders.ts
"use client";

import { useState } from "react";
import { TruckFullscreenLoader } from "@/components/ui/truck-fullscreen-loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MoySkladClient } from "@/lib/ms-client";

const msClient = new MoySkladClient(process.env.MOYSKLAD_TOKEN!);

export default function OrdersActionsPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const selectedOrderIds = ["WB-123456", "OZ-789012"];

  const handleSendToMoysklad = async () => {
    if (!selectedOrderIds.length) return;

    setIsProcessing(true);

    try {
      for (const externalId of selectedOrderIds) {
        const clientId = "00000000-0000-0000-0000-000000000000"; // или поиск по телефону

        await msClient.createCustomerOrder(clientId, {
          comment: `Заказ с маркетплейса • ${externalId}`,
          positions: [
            {
              name: "Футболка Premium",
              vendorCode: "ART-001",
              color: "Черный",
              size: "L",
              brand: "FF24",
              quantity: 1,
            },
          ],
        });

        await new Promise(r => setTimeout(r, 400));
      }

      toast({ title: "Готово!", description: "Все заказы отправлены в МойСклад" });
    } catch (error: any) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Массовые действия</h1>
        <Button onClick={handleSendToMoysklad} disabled={isProcessing} size="lg">
          {isProcessing ? "Отправляем..." : "Отправить в МойСклад"}
        </Button>
      </div>
      <TruckFullscreenLoader isLoading={isProcessing} message="Отправляем заказы..." />
    </>
  );
}
