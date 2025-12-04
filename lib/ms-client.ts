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
    console.log("🔵 MS REQUEST:", { url, method: options.method || "GET" });

    const res = await fetch(url, {
      ...options,
      headers: { ...this.headers, ...options.headers },
    });

    const responseText = await res.text();

    console.log("🟡 MS RESPONSE:", {
      status: res.status,
      body: responseText,
    });

    if (res.status === 204) return null;

    if (!res.ok) {
      throw new ApiError(`Ошибка API МойСклад (${res.status})`, res.status, responseText);
    }

    try {
      return JSON.parse(responseText);
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
  // 🔍 Поиск контрагента по телефону
  // --------------------------------------------------
  async findCounterpartyByPhone(phone: string) {
    const digits = phone.replace(/\D/g, "");
    const url = `${this.apiUrl}/entity/counterparty?filter=phone~${digits}`;

    console.log("📞 Поиск по телефону:", digits);

    const data = await this.http.get(url);

    return data?.rows?.[0] ?? null;
  }

  // --------------------------------------------------
  // 🔍 Поиск контрагента по строке (email, название)
  // --------------------------------------------------
  async findCounterparty(query: string) {
    const url = `${this.apiUrl}/entity/counterparty?search=${encodeURIComponent(query)}`;

    console.log("🔍 Поиск по строке:", query);

    const data = await this.http.get(url);

    return data?.rows?.[0] ?? null;
  }

  // --------------------------------------------------
  // 📄 Получить контрагента по ID
  // --------------------------------------------------
  async getCounterparty(id: string) {
    const url = `${this.apiUrl}/entity/counterparty/${id}`;
    return this.http.get(url);
  }

  // --------------------------------------------------
  // 📦 Остатки товаров
  // --------------------------------------------------
  async checkInventory(): Promise<any[]> {
    const url = `${this.apiUrl}/report/stock/bystore?store.id=${STORE_ID}`;
    const data = await this.http.get(url);

    if (!data?.rows) return [];

    return data.rows.map((row: any) => ({
      name: row.assortment?.name ?? "",
      code: row.assortment?.article ?? "",
      stock: row.stock ?? 0,
      reserve: row.reserve ?? 0,
      inTransit: row.inTransit ?? 0,
      productId: row.assortment?.id ?? "",
    }));
  }

  // --------------------------------------------------
  // 🧾 Создание контрагента
  // --------------------------------------------------
  async createCounterparty(client: ClientData) {
    const url = `${this.apiUrl}/entity/counterparty`;

    const body = {
      name: client.full_name,
      phone: client.phone,
      email: client.email,
      inn: client.inn,
      legalAddress: client.address,
      companyType: client.org_type === "LEGAL" ? "legal" : "individual",
    };

    return this.http.post(url, body);
  }

  // --------------------------------------------------
  // 🏷 Создание товара
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
  // 🧾 Создание ЗАКАЗА КЛИЕНТА (customerorder)
  // --------------------------------------------------
  async createCustomerOrder(clientId: string, order: OrderData) {
    const url = `${this.apiUrl}/entity/customerorder`;

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

    const positions = await Promise.all(
      order.positions.map(async (pos) => {
        const product = await this.createProduct(pos);
        return {
          quantity: pos.quantity,
          price: pos.price ?? 0,
          assortment: { meta: product.meta },
        };
      })
    );

    const brand = order.positions?.[0]?.brand ?? "Не указан";

    const body = {
      agent: clientMeta,
      organization: orgMeta,
      store: storeMeta,
      description: order.workInstructions ?? "Нет инструкций",
      attributes: [{ id: MS_BRAND_ID, value: brand }],
      positions,
    };

    return this.http.post(url, body);
  }

  // --------------------------------------------------
  // 📦 Создание заявки на поставку (supply)
  // --------------------------------------------------
  async createSupply(clientId: string, order: OrderData) {
    const url = `${this.apiUrl}/entity/supply`;

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

    const positions = await Promise.all(
      order.positions.map(async (pos) => {
        const product = await this.createProduct(pos);
        return {
          quantity: pos.quantity,
          price: pos.price ?? 0,
          assortment: { meta: product.meta },
        };
      })
    );

    const brand = order.positions?.[0]?.brand ?? "Не указан";

    const body = {
      agent: clientMeta,
      organization: orgMeta,
      store: storeMeta,
      applicable: false,
      description: order.workInstructions ?? "Нет инструкций",
      attributes: [{ id: MS_BRAND_ID, value: brand }],
      positions,
    };

    return this.http.post(url, body);
  }
}
