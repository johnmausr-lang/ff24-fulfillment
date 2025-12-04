// lib/models.ts

import { z } from 'zod';

// --- Схемы Zod (заменяют Pydantic-модели) ---

// Схема для данных клиента (регистрация/авторизация)
export const ClientDataSchema = z.object({
  phone: z.string().min(1).regex(/^\+7\d{10}$/, { message: 'Телефон должен быть в формате +79XXXXXXXXX' }),
  email: z.string().email().optional(),
  inn: z.string().optional(),
  full_name: z.string().optional(),
  address: z.string().optional(),
  org_type: z.enum(['LEGAL', 'INDIVIDUAL']).optional(), // Юр. лицо или ИП
  ogrn: z.string().optional(),
  kpp: z.string().optional(),
});

// Схема для отдельной позиции в заказе
export const OrderPositionDataSchema = z.object({
  brand: z.string().min(1, 'Бренд обязателен'),
  name: z.string().min(1, 'Наименование обязательно'),
  color: z.string().min(1, 'Цвет обязателен'),
  vendorCode: z.string().min(1, 'Артикул обязателен'),
  size: z.string().min(1, 'Размер обязателен'),
  quantity: z.number().int().positive('Количество должно быть положительным'),
  photoUrl: z.string().optional(), // URL, куда загружено фото
});

// Схема для всего заказа (заявки на поставку)
export const OrderDataSchema = z.object({
  positions: z.array(OrderPositionDataSchema).min(1, 'Должна быть хотя бы одна позиция'),
  deliveryMethod: z.string().optional(), // Логика из OrderDelivery
  workInstructions: z.string().optional(), // Логика из OrderTasks
  draftId: z.string().optional(), // ID черновика
});

// --- Типы TS (используем для строгой типизации) ---

export type ClientData = z.infer<typeof ClientDataSchema>;
export type OrderPositionData = z.infer<typeof OrderPositionDataSchema>;
export type OrderData = z.infer<typeof OrderDataSchema>;
