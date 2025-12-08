// actions/orders.ts
"use server";

import { revalidatePath } from "next/cache";
import { MoySkladClient } from "@/lib/ms-client";

const msClient = new MoySkladClient(process.env.MOYSKLAD_TOKEN!);

/**
 * Массовая отправка заказов в МойСклад
 * orderIds — массив внешних ID (например: WB-123456)
 */
export async function createBatchOrdersInMoysklad(orderIds: string[]) {
  if (!orderIds.length) {
    throw new Error("Не выбрано ни одного заказа");
  }

  console.log(`Отправляем ${orderIds.length} заказов в МойСклад...`);

  for (const externalId of orderIds) {
    try {
      // Пример: ищем контрагента по телефону/email или создаём нового
      const counterparty = await msClient.findCounterparty(externalId.split("-")[0]); // заглушка
      const clientId = counterparty?.id || "new-client-placeholder";

      // Формируем позиции (в реальности — из твоей БД)
      const positions = [
        {
          name: "Футболка Premium",
          vendorCode: "ART-001",
          color: "Черный",
          size: "L",
          quantity: 1,
        },
      ];

      await msClient.createCustomerOrder(clientId, {
        comment: `Заказ с маркетплейса • ${externalId}`,
        positions,
      });

      console.log(`Заказ ${externalId} успешно создан`);
      
      // Защита от лимита API
      await new Promise((r) => setTimeout(r, 400));
    } catch (error: any) {
      console.error(`Ошибка при создании заказа ${externalId}:`, error.message);
      // Можно продолжить или прервать — решай сам
      // throw error;
    }
  }

  revalidatePath("/orders");
  revalidatePath("/dashboard");
}
