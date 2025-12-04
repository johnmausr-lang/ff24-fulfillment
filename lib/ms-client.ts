// lib/ms-client.ts

import {
  MS_API_URL,
  ORGANIZATION_ID,
  STORE_ID,
  MS_BRAND_ID,
  MS_SIZE_ID,
  MS_COLOR_ID,
} from "./config";

import {
  OrderCreatePayload,
  OrderCreatePosition,
} from "./models";

// ==================================================
// Класс ошибки API
// ==================================================
export class ApiError extends Error {
  constructor(message: string, public status: number = 500, public details?: any) {
    super(message);
    this.name = "ApiError";
  }
}

// ==================================================
// Низкоуровневый HTTP клиент
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
      throw new ApiError(
        `Ошибка API МойСклад (${res.status})`,
        res.status,
        text
      );
    }

    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  get(url: string, opts?: RequestInit) {
    return this.request(url, { method: "GET", ...opts });
  }

  post(url: string, body: any, opts?: RequestInit) {
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...opts,
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
  // 🔍 Поиск контрагента (email / строка)
  // --------------------------------------------------
  async findCounterparty(query: string) {
    const url = `${this.apiUrl}/entity/counterparty?search=${encodeURIComponent(query)}`;
    const data = await this.http.get(url);
    return data?.rows?.[0] ?? null;
  }

  // --------------------------------------------------
  // 📄 Получить контрагента по ID
  // --------------------------------------------------
  async getCounterpartyById(id: string) {
    return this.http.get(`${this.apiUrl}/entity/counterparty/${id}`);
  }

  // --------------------------------------------------
  // 📦 Остатки товаров на складе
  // --------------------------------------------------
  async checkInventory(): Promise<any[]> {
    const url = `${this.apiUrl}/report/stock/bystore?store.id=${STORE_ID}`;
    const data = await this.http.get(url);

    if (!data?.rows) return [];

    return data.rows.map((row: any) => ({
      productId: row.assortment?.id ?? "",
      name: row.assortment?.name ?? "",
      code: row.assortment?.article ?? "",
      stock: row.stock ?? 0,
      reserve: row.reserve ?? 0,
      inTransit: row.inTransit ?? 0,
    }));
  }

  // --------------------------------------------------
  // 🏷 Создание товара для позиции
  // --------------------------------------------------
  private async createProduct(position: OrderCreatePosition) {
    const url = `${this.apiUrl}/entity/product`;

    const body = {
      name: `${position.name} (${position.color})`,
      article: position.vendorCode,
      attributes: [
        { id: MS_SIZE_ID, value: position.size },
        { id: MS_COLOR_ID, value: position.color },
      ],
    };

    return this.http.post(url, body);
  }

  // --------------------------------------------------
  // 🧾 Создание заказа покупателя (customerorder)
  // --------------------------------------------------
  async createCustomerOrder(clientId: string, payload: OrderCreatePayload) {
    const url = `${this.apiUrl}/entity/customerorder`;

    const agentMeta = {
      meta: {
        href: `${this.apiUrl}/entity/counterparty/${clientId}`,
        type: "counterparty",
        mediaType: "application/json",
      },
    };

    const organizationMeta = {
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

    // Создание товаров перед добавлением в заказ
    const positions = await Promise.all(
      payload.positions.map(async (pos) => {
        const createdProduct = await this.createProduct(pos);

        return {
          quantity: pos.quantity,
          price: 100,
          assortment: { meta: createdProduct.meta },
        };
      })
    );

    const body = {
      name: `Заказ ${Date.now()}`,
      description: payload.comment || "",
      agent: agentMeta,
      organization: organizationMeta,
      store: storeMeta,
      applicable: false,
      attributes: [
        { id: MS_BRAND_ID, value: payload.positions?.[0]?.brand || "" },
      ],
      positions,
    };

    return this.http.post(url, body);
  }
}
