// src/actions/orders.ts
"use server";

import { revalidatePath } from "next/cache";

const MOYSKLAD_TOKEN = process.env.MOYSKLAD_TOKEN!;
const MOYSKLAD_URL = "https://api.moysklad.ru/api/remap/1.2/entity/customerorder";

export async function createBatchOrdersInMoysklad(orderIds: string[]) {
  try {
    for (const id of orderIds) {
      await fetch(MOYSKLAD_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${MOYSKLAD_TOKEN}`,
          "Content-Type": "application/json",
          "Lognex-Pretty-Print-JSON": "true",
        },
        body: JSON.stringify({
          name: `FF24-${id}`,
          agent: { meta: { href: "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/...", type: "counterparty", mediaType: "application/json" }},
          description: `Создано через FF24 Fulfillment • Заказ #${id}`,
        }),
      });
      await new Promise(r => setTimeout(r, 500)); // защита от лимитов
    }

    revalidatePath("/orders");
  } catch (error) {
    console.error("Ошибка отправки в МойСклад:", error);
    throw new Error("Не удалось создать заказы в МойСклад");
  }
}
