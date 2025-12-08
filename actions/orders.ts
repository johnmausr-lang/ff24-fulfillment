// actions/orders.ts — исправленная версия
"use server";

import { revalidatePath } from "next/cache";
import { MoySkladClient } from "@/lib/ms-client";

const msClient = new MoySkladClient(process.env.MOYSKLAD_TOKEN!);

export async function createBatchOrdersInMoysklad(orderIds: string[]) {
  if (!orderIds.length) {
    throw new Error("Не выбрано ни одного заказа");
  }

  console.log(`Отправляем ${orderIds.length} заказов в МойСклад...`);

  for (const externalId of orderIds) {
    try {
      // Заглушка поиска контрагента
      const counterparty = await msClient.findCounterparty(""); // можно по телефону/email
      const clientId = counterparty?.id || "00000000-0000-0000-0000-000000000000";

      // ВАЖНО: brand обязателен в OrderPositionData
      const positions = [
        {
          name: "Футболка Premium",
          vendorCode: "ART-001",
          color: "Черный",
          size: "L",
          brand: "FF24",        // ← ДОБАВИЛИ!
          quantity: 1,
        },
      ];

      await msClient.createCustomerOrder(clientId, {
        comment: `Заказ с маркетплейса • ${externalId}`,
        positions,
      });

      console.log(`Заказ ${externalId} успешно создан`);

      await new Promise((r) => setTimeout(r, 400));
    } catch (error: any) {
      console.error(`Ошибка при создании заказа ${externalId}:`, error.message);
    }
  }

  revalidatePath("/orders");
  revalidatePath("/dashboard");
}
