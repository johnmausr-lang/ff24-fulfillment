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
  ClientData,
  OrderData,
  OrderPositionData,
  CustomerOrderPayload,
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

    if (res.status === 204) return null;

    if (!res.ok) {
      throw new ApiError(`Ошибка API МойСклад (${res.status})`, res.status, text);
    }

    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  get(url: string) {
    return this.request(url, { method: "GET" });
  }

  post(url: string, body: any) {
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(body),
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
  // 🔍 Поиск контрагента по EMAIL / имени / коду
  // --------------------------------------------------
  async findCounterparty(query: string) {
    const url = `${this.apiUrl}/entity/counterparty?search=${encodeURIComponent(query)}`;

    console.log("🔍 Поиск контрагента:", query);

    const data = await this.http.get(url);

    return data?.rows?.[0] ?? null;
  }

  // --------------------------------------------------
  // 📄 Получить контрагента по ID
  // --------------------------------------------------
  async getCounterpartyById(id: string) {
    const url = `${this.apiUrl}/entity/counterparty/${id}`;
    return this.http.get(url);
  }

  // --------------------------------------------------
  // 📦 Остатки товаров на складе
  // --------------------------------------------------
  async checkInventory() {
    const url = `${this.apiUrl}/report/stock/bystore?store.id=${STORE_ID}`;

    const data = await this.http.get(url);
    if (!data?.rows) return [];

    return data.rows.map((row: any) => ({
      id: row.assortment?.id,
      name: row.assortment?.name,
      code: row.assortment?.code,
      stock: row.stock,
      reserve: row.reserve,
      inTransit: row.inTransit,
    }));
  }

  // --------------------------------------------------
  // 🧾 Создание *товара* если его нет
  // --------------------------------------------------
  private async createProduct(position: OrderPositionData) {
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
  // 🧾 Создание CustomerOrder (заказ клиента)
  // --------------------------------------------------
  async createCustomerOrder(clientId: string, order: CustomerOrderPayload) {
    const url = `${this.apiUrl}/entity/customerorder`;

    // ---- ссылки
    const clientMeta = {
      meta: {
        href: `${this.apiUrl}/entity/counterparty/${clientId}`,
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

    // ---- создаём товары (если их не было)
    const positions = await Promise.all(
      order.positions.map(async (pos) => {
        const product = await this.createProduct(pos);
        return {
          quantity: pos.quantity,
          price: 100,
          assortment: {
            meta: product.meta,
          },
        };
      })
    );

    const body = {
      agent: clientMeta,
      organization: orgMeta,
      store: storeMeta,
      description: order.workInstructions ?? "",
      applicable: false,
      attributes: [
        { id: MS_BRAND_ID, value: order.positions?.[0]?.brand ?? "Не указан" },
      ],
      positions,
    };

    return this.http.post(url, body);
  }

  // --------------------------------------------------
  // 📄 Получить список заказов клиента
  // --------------------------------------------------
  async getCustomerOrders(clientId: string) {
    const url = `${this.apiUrl}/entity/customerorder?filter=agent=${clientId}`;

    console.log("📦 ЗАПРОС ЗАКАЗОВ:", url);

    const data = await this.http.get(url);
    if (!data?.rows) return [];

    return data.rows.map((x: any) => ({
      id: x.id,
      name: x.name,
      created: x.created,
      sum: x.sum ?? 0,
      state: x.state?.name ?? "Не указан",
    }));
  }
}
