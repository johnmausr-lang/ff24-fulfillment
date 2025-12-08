// src/app/orders/page.tsx
import { TruckFullscreenLoader } from '@/components/ui/truck-fullscreen-loader';
import { Button } from '@/components/ui/button';
import { createBatchOrdersInMoysklad } from '@/actions/orders';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export default function OrdersPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Пример: выбрано 240 заказов
  const selectedOrders = ['1', '2', /* ...240 штук... */];

  const handleSendToMoysklad = async () => {
    setIsProcessing(true);
    try {
      await createBatchOrdersInMoysklad(selectedOrders);
      toast({ title: 'Успех', description: 'Все заказы отправлены в МойСклад!' });
    } catch (err) {
      toast({ title: 'Ошибка', description: 'Что-то пошло не так', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Заказы</h1>
          <Button
            onClick={handleSendToMoysklad}
            disabled={isProcessing || selectedOrders.length === 0}
            size="lg"
            className="bg-red-600 hover:bg-red-500"
          >
            {isProcessing
              ? `Отправляем ${selectedOrders.length} заказов...`
              : `Отправить ${selectedOrders.length} заказов в МойСклад`}
          </Button>
        </div>

        {/* Таблица заказов */}
        <div className="bg-card rounded-xl border">
          {/* ...твоя таблица... */}
        </div>
      </div>

      <TruckFullscreenLoader
        isLoading={isProcessing}
        message={`Отправляем ${selectedOrders.length} заказов в МойСклад...`}
      />
    </>
  );
}
