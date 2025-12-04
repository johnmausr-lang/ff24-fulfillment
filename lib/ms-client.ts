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

/* ================================================================
   КЛАСС ОШИБОК
================================================================ */
export class ApiError extends Error {
  constructor(message: string, public status: number = 500) {
    super(message);
    this.name = "ApiError";
  }
}

/* ================================================================
   НИЗКОУРОВНЕВЫЙ HTTP-КЛИЕНТ ДЛЯ ЗАПРОСОВ К МОЙСКЛАД
================================================================ */
class MsHttpClient {
  private headers: Record<string, string>;

  constructor(private token: string) {
    this.headers = {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  private async request(url: string, options: RequestInit = {}) {
    console.log("MS API REQUEST:", url);

    const res = await fetch(url, {
      ...options,
      headers: { ...this.headers, ...options.headers },
    });

    // Нет тела
    if (res.status === 204) return null;

    // Ошибка
    if (!res.ok) {
      const text = await res.text();
      console.error("❌ MS API ERROR", res.status, text);
      throw new ApiError(`Ошибка API МойСклад (${res.status})`, res.status);
    }

    const type = res.headers.get("content-type");

    if (type?.includes("application/json")) return res.json();
    return null;
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

/* ================================================================
   ОСНОВНОЙ МОЙСКЛАД КЛИЕНТ
================================================================ */
export class MoySkladClient {
  private apiUrl = MS_API_URL;
  private http: MsHttpClient;

  constructor(token: string) {
    this.http = new MsHttpClient(token);
  }

  /* ------------------------------------------------------------
     🔍 Поиск клиента по телефону
     (filter=phone~ работает только если телефон есть в card)
  ------------------------------------------------------------ */
  async findCounterpartyByPhone(phone: string): Promise<any | null> {
    const digits = phone.replace(/\D/g, "");

    const url = `${this.apiUrl}/entity/counterparty?filter=phone~${digits}`;
    const data = await this.http.get(url);

    if (!data?.rows?.length) return null;

    return data.rows[0];
  }

  /* ------------------------------------------------------------
     🔍 Поиск клиента по email (через search)
  ------------------------------------------------------------ */
  async findCounterparty(query: string): Promise<any | null> {
    const url = `${this.apiUrl}/entity/counterparty?search=${encodeURIComponent(
      query
    )}`;

    const data = await this.http.get(url);

    return data?.rows?.[0] ?? null;
  }

  /* ------------------------------------------------------------
     Получить клиента по ID
  ------------------------------------------------------------ */
  async getCounterparty(id: string): Promise<any> {
    return this.http.get(`${this.apiUrl}/entity/counterparty/${id}`);
  }

  /* ------------------------------------------------------------
     📦 Проверка остатков товаров на складе
  ------------------------------------------------------------ */
  async checkInventory(): Promise<any[]> {
    const url = `${this.apiUrl}/report/stock/bystore?store.id=${STORE_ID}`;

    const data = await this.http.get(url);

    if (!data?.rows) return [];

    return data.rows.map((row: any) => ({
      name: row.assortment?.name || "",
      code: row.assortment?.article || "",
      stock: row.stock || 0,
      reserve: row.reserve || 0,
      inTransit: row.inTransit || 0,
      productId: row.assortment?.id || "",
    }));
  }

  /* ------------------------------------------------------------
     🧾 Создание контрагента
  ------------------------------------------------------------ */
  async createCounterparty(client: ClientData): Promise<any> {
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

  /* ------------------------------------------------------------
     📦 Создание заявки на поставку
  ------------------------------------------------------------ */
  async createSupply(clientId: string, order: OrderData): Promise<any> {
    const base = this.apiUrl;

    const clientMeta = {
      meta: {
        href: `${base}/entity/counterparty/${clientId}`,
        type: "counterparty",
        mediaType: "application/json",
      },
    };

    const orgMeta = {
      meta: {
        href: `${base}/entity/organization/${ORGANIZATION_ID}`,
        type: "organization",
        mediaType: "application/json",
      },
    };

    const storeMeta = {
      meta: {
        href: `${base}/entity/store/${STORE_ID}`,
        type: "store",
        mediaType: "application/json",
      },
    };

    const positions = await Promise.all(
      order.positions.map(async (pos) => {
        const product = await this.createProduct(pos);
        return {
          quantity: pos.quantity,
          price: 100,
          assortment: { meta: product.meta },
        };
      })
    );

    const brand = order.positions[0]?.brand || "Не указан";

    const body = {
      agent: clientMeta,
      organization: orgMeta,
      store: storeMeta,
      description: order.workInstructions || "Нет инструкций",
      applicable: false,
      attributes: [{ id: MS_BRAND_ID, value: brand }],
      positions,
    };

    return this.http.post(`${base}/entity/supply`, body);
  }

  /* ------------------------------------------------------------
     🏷 Создание товара
  ------------------------------------------------------------ */
  private async createProduct(pos: OrderPositionData): Promise<any> {
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
}
