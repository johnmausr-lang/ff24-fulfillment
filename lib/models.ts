// lib/models.ts

// ---------------------------------------------------
// ДАННЫЕ КЛИЕНТА
// ---------------------------------------------------
export interface ClientData {
  full_name: string;
  phone: string;
  email: string;
  inn?: string;
  address?: string;
  org_type?: "LEGAL" | "INDIVIDUAL";
}

// ---------------------------------------------------
// ПОЗИЦИЯ ЗАКАЗА
// ---------------------------------------------------
export interface OrderPositionData {
  name: string;          // Название товара
  vendorCode: string;    // Артикул
  color: string;         // Цвет
  size: string;          // Размер
  quantity: number;      // Количество
  brand: string;         // Бренд
  photoUrl?: string;     // Ссылка на фото (опционально)
}

// ---------------------------------------------------
// ЗАКАЗ
// ---------------------------------------------------
export interface OrderData {
  positions: OrderPositionData[];

  workInstructions?: string;
  deliveryMethod?: string;
  draftId?: string;

  // Добавлено поле COMMENT
  comment?: string;
}
