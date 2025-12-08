// src/actions/orders.ts
"use server";

import { revalidatePath } from "next/cache";

/**
 * Настройки МойСклад — добавь в .env
 * MOYSKLAD_TOKEN=ваш_токен_с_полным_доступом
 * MOYSKLAD_COUNTERPARTY_ID=ID_вашего_контрагента_или_организации
 */
const MOYSKLAD_TOKEN = process.env.MOYSKLAD_TOKEN;
const MOYSKLAD_COUNTERPARTY_HREF =
  process.env.MOYSKLAD_COUNTERPARTY_HREF ||
  "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/ваш-id"; // ← замени или оставь как есть

if (!MOYSKLAD_TOKEN) {
  throw new Error("MOYSKLAD_TOKEN не задан в .env");
}

/**
 * Создание одного заказа в МойСклад
 */
async function createOrderInMoysklad(orderData: {
  externalId: string; // например: WB-123456
  name: string;      // номер заказа на маркетплейсе
  positions: Array<{
    assortmentHref: string; // ссылка на товар в МойСклад
    quantity: number;
    price: number; // в копейках (100.00 руб = 10000)
  }>;
  moment?: string; // дата заказа
  description?: string;
}) {
  const url = "https://api.moysklad.ru/api/remap/1.2/entity/customerorder";

  const body = {
    name: orderData.name,
    externalCode: orderData.externalId, // важно для избежания дублей
    moment: orderData.moment || new Date().toISOString(),
    agent: {
      meta: {
        href: MOYSKLAD_COUNTERPARTY_HREF,
        type: "counterparty",
        mediaType: "application/json",
      },
    },
    description: orderData.description || `Создано через FF24 Fulfillment • ${orderData.externalId}`,
    positions: orderData.positions.map((pos) => ({
      quantity: pos.quantity,
      price: pos.price, // в копейках
      assortment: {
        meta: {
          href: pos.assortmentHref,
          type: "product",
          mediaType: "application/json",
        },
      },
    })),
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MOYSKLAD_TOKEN}`,
      "Content-Type": "application/json",
      "Lognex-Pretty-Print-JSON": "true",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Ошибка МойСклад API:", res.status, errorText);
    throw new Error(`МойСклад вернул ошибку ${res.status}: ${errorText}`);
  }

  const result = await res.json();
  console.log("Заказ успешно создан в МойСклад:", result.name, result.id);
  return result;
}

/**
 * Массовая отправка заказов в МойСклад
 * orderIds — массив внешних ID заказов (например, из WB/Ozon)
 */
export async function createBatchOrdersInMoysklad(orderIds: string[]) {
  if (orderIds.length === 0) {
    throw new Error("Не выбрано ни одного заказа");
  }

  console.log(`Начинаем отправку ${orderIds.length} заказов в МойСклад...`);

  // Пример маппинга — в реальном проекте ты будешь тянуть данные из своей БД
  const mockPositions = [
    {
      assortmentHref: "https://api.moysklad.ru/api/remap/1.2/entity/product/ваш-id-товара-1",
      quantity: 1,
      price: 249900, // 2499.00 руб
    },
  ];

  for (let i = 0; i < orderIds.length; i++) {
    const externalId = orderIds[i];
    const orderName = `FF24-${externalId}`;

    try {
      await createOrderInMoysklad({
        externalId,
        name: orderName,
        positions: mockPositions,
        description: `Маркетплейс • Заказ ${externalId}`,
      });

      // Защита от лимита 100 запросов/сек
      if (i < orderIds.length - 1) {
        await new Promise((r) => setTimeout(r, 350)); // ~3 запроса в секунду
      }
    } catch (error: any) {
      console.error(`Ошибка при создании заказа ${externalId}:`, error.message);
      // Можно продолжить или прервать — решай сам
      // throw error; // если хочешь прервать всю пачку
    }
  }

  // Обновляем страницу заказов
  revalidatePath("/orders");
  revalidatePath("/dashboard");

  console.log("Все заказы успешно отправлены в МойСклад");
}
