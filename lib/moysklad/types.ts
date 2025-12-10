// Базовое описание meta — используется везде в МойСклад
export interface MSMeta {
  href: string;
  type: string;
  mediaType: string;
}

// -------------------------------
// ТОВАР
// -------------------------------
export interface MSProduct {
  id: string;
  name: string;
  article?: string;
  description?: string;
  meta: MSMeta;
}

// -------------------------------
// ОСТАТКИ
// -------------------------------
export interface MSInventoryRow {
  assortment: {
    id?: string;
    name?: string;
    meta: MSMeta;
  };
  stock: number;
  freeStock: number;
}

// -------------------------------
// КОНТРАГЕНТ
// -------------------------------
export interface MSCounterparty {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  meta: MSMeta;             // ← ЭТО ВАЖНО!
}

// -------------------------------
// ОРДЕР / ЗАКАЗ
// -------------------------------
export interface MSOrder {
  id: string;
  name: string;
  created?: string;
  meta: MSMeta;             // ← добавлено
}

// -------------------------------
// ПРИЁМКА (Supply)
// -------------------------------
export interface MSSupply {
  id: string;
  name: string;
  created?: string;
  meta: MSMeta;             // ← обязательно
}
