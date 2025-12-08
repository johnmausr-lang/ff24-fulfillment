// src/actions/orders.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Заглушка — потом заменишь на реальный вызов МойСклад API
 */
export async function createBatchOrdersInMoysklad(orderIds: string[]) {
  // Имитация долгой операции (чтобы грузовик успел проехать)
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log("Отправляем в МойСклад заказы:", orderIds);

  // Пример: обновляем данные на странице заказов
  revalidatePath("/orders");

  // Если нужно — редиректим
  // redirect("/orders");
}
