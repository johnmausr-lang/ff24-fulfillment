// lib/ms-client.ts

import {
  MS_API_URL,
  ORGANIZATION_ID,
  STORE_ID,
  MS_BRAND_ID,
  MS_SIZE_ID,
  MS_COLOR_ID,
} from "./config";

import { ClientData, OrderData, OrderPositionData } from "./models";

// ==================================================
// Класс ошибки API
// ==================================================
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ==================================================
// Низкоуровневый HTTP-клиент
// ==================================================
class MsHttpClient {
  private headers: Record<string, string>;

  constructor(private token: string) {
    this.headers = {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json;charset=utf-8",
    };
  }

  private async request(url: string, options: RequestInit = {}) {
    console.log("🔵 MS REQUEST:", {
      url,
      method: options.method || "GET",
    });

    const res = await fetch(url, {
      ...options,
      headers: { ...this.headers, ...options.headers },
    });

    const text = await res.text();

    console.log("🟡 MS RESPONSE:", {
      status: res.status,
      body: text,
    });

    if (!res.ok) {
      throw new ApiError(`Ошибка API МойСклад (${res.status})`, res.status, text);
    }

    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  get(url: string, options?: RequestInit) {
    return this.request(url, { method: "GET", ...options });
  }

  post(url: string, body: any, options?: RequestInit) {
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    });
  }
}

// ==================================================
// Основной клиент МойСклад
// ==================================================
export class MoySkladClient {
  private apiUrl = MS_API_URL;
  private http: MsHttpClient;

  constructor(token: string) {
    this.http = new MsHttpClient(token);
  }

  // --------------------------------------------------
  // ПОИСК КОНТРАГЕНТА ПО EMAIL / НАЗВАНИЮ
  // --------------------------------------------------
  async findCounterparty(query: string) {
    const url = `${this.apiUrl}/entity/counterparty?search=${encodeURIComponent(
      query
    )}`;
    const data = await this.http.get(url);
    return data?.rows?.[0] ?? null;
  }

  // --------------------------------------------------
  // ПОИСК КОНТРАГЕНТА ПО ТЕЛЕФОНУ
  // --------------------------------------------------
  async findCounterpartyByPhone(phone: string) {
    const digits = phone.replace(/\D/g, "");
    const url = `${this.apiUrl}/entity/counterparty?filter=phone~${digits}`;
    const data = await this.http.get(url);
    return data?.rows?.[0] ?? null;
  }

  // --------------------------------------------------
  // ПОЛУЧИТЬ КОНТРАГЕНТА ПО ID
  // --------------------------------------------------
  async getCounterpartyById(id: string) {
    const url = `${this.apiUrl}/entity/counterparty/${id}`;
    return this.http.get(url);
  }

  // --------------------------------------------------
  // СОЗДАТЬ ТОВАР (если отсутствует)
  // --------------------------------------------------
  private async createProduct(pos: OrderPositionData) {
    const url = `${this.apiUrl}/entity/product`;

    const body = {
      name: `${pos.name} (${pos.color})`,
      article: pos.vendorCode,
      attributes: [
        { id: MS_SIZE_ID, value: pos.size },
        { id: MS_COLOR_ID, value: pos.color },
      ],
    };

    return this.http.post(url, body);
  }

  // --------------------------------------------------
  // СОЗДАНИЕ ЗАКАЗА ПОКУПАТЕЛЯ (customerorder)
  // --------------------------------------------------
  async createCustomerOrder(counterpartyId: string, order: OrderData) {
    const url = `${this.apiUrl}/entity/customerorder`;

    const counterpartyMeta = {
      meta: {
        href: `${this.apiUrl}/entity/counterparty/${counterpartyId}`,
        type: "counterparty",
        mediaType: "application/json",
      },
    };

    const orgMeta = {
      meta: {
        href: `${this.apiUrl}/entity/organization/${ORGANIZATION_ID}`,
        type: "organization",
        mediaType: "application/json",
      },
    };

    const storeMeta = {
      meta: {
        href: `${this.apiUrl}/entity/store/${STORE_ID}`,
        type: "store",
        mediaType: "application/json",
      },
    };

    // --- создаём товары, собираем позиции ---
    const positions = await Promise.all(
      order.positions.map(async (pos) => {
        const product = await this.createProduct(pos);

        return {
          quantity: pos.quantity,
          price: 100 * 100,
          assortment: { meta: product.meta },
        };
      })
    );

    const brand = order.positions[0]?.brand || "Не указан";

    const body = {
      agent: counterpartyMeta,
      organization: orgMeta,
      store: storeMeta,
      applicable: false,

      // ⬅️ Твой COMMENT хранится в description
      description: order.comment || order.workInstructions || "",

      attributes: [
        {
          id: MS_BRAND_ID,
          value: brand,
        },
      ],

      positions,
    };

    return this.http.post(url, body);
  }
}
