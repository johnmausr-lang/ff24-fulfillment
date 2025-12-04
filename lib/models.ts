import { z } from "zod";

/* -----------------------------------------------------
   Клиент (контрагент)
----------------------------------------------------- */

export const ClientDataSchema = z.object({
  full_name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  inn: z.string().optional(),
  address: z.string().optional(),
  org_type: z.enum(["LEGAL", "INDIVIDUAL"]).optional(),
});

export type ClientData = z.infer<typeof ClientDataSchema>;

/* -----------------------------------------------------
   Позиция заказа
----------------------------------------------------- */

export interface OrderPositionData {
  name: string;
  vendorCode: string;
  color: string;
  size: string;
  quantity: number;
  brand: string;
  photoUrl?: string;
}

/* -----------------------------------------------------
   Старый OrderData — пусть остаётся
----------------------------------------------------- */

export interface OrderData {
  positions: OrderPositionData[];
  workInstructions?: string;
  deliveryMethod?: string;
  draftId?: string;
}

/* -----------------------------------------------------
   🔥 Новый CustomerOrderPayload
   Используется для customerorder и supply
----------------------------------------------------- */

export interface CustomerOrderPayload {
  positions: OrderPositionData[];

  // Опциональные поля
  comment?: string;            // Комментарий клиента
  deliveryMethod?: string;     // Способ доставки
  workInstructions?: string;   // Рабочие инструкции (комментарий)
  draftId?: string;            // ID черновика, если обновляем черновик
}
