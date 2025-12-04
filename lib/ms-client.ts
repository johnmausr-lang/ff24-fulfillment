// lib/ms-client.ts

import {
  MS_API_URL,
  ORGANIZATION_ID,
  MS_BRAND_ID,
  MS_SIZE_ID,
  MS_COLOR_ID,
  PDF_TEMPLATE_ID,
  STORE_ID
} from "./config";

import { ClientData, OrderData, OrderPositionData } from "./models";

// --- Вспомогательные типы и классы ---

export class ApiError extends Error {
  constructor(message: string, public status: number = 500) {
    super(message);
    this.name = "ApiError";
  }
}

// Упрощенный HTTP клиент
class MsHttpClient {
  private headers: Record<string, string>;

  constructor(private token: string) {
    this.headers = {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    };
  }

  private async request(url: string, options: RequestInit = {}): Promise<any> {
    const res = await fetch(url, {
      ...options,
      headers: { ...this.headers, ...options.headers }
    });

    if (res.status === 204) return null;

    if (!res.ok) {
      const err = await res.text();
      console.error(`Ошибка MS ${res.status}: ${err}`);
      throw new ApiError(`Ошибка при обращении к МойСклад: ${res.status}`, res.status);
    }

    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return res.json();
    }

    return null;
  }

  post(url: string, body: any, options?: RequestInit): Promise<any> {
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...options
    });
  }

  get(url: string, options?: RequestInit): Promise<any> {
    return this.request(url, {
      method: "GET",
      ...options
    });
  }
}

// --- MoySklad Client ---

export class MoySkladClient {
  private apiUrl = MS_API_URL;
  private http: MsHttpClient;

  constructor(token: string) {
    this.http = new MsHttpClient(token);
  }

  // ----------------------------------------
  // 🔥 ДОБАВЛЕННЫЙ МЕТОД (исправляет ошибку)
  // ----------------------------------------
  async findCounterparty(query: string): Promise<any | null> {
    const url = `${this.apiUrl}/entity/counterparty?search=${encodeURIComponent(query)}`;
    const data = await this.http.get(url);

    if (!data?.rows?.length) return null;

    return data.rows[0];
  }

  // Получение контрагента
  async getCounterparty(id: string) {
    const url = `${this.apiUrl}/entity/counterparty/${id}`;
    return this.http.get(url);
  }

  // Создание контрагента
  async createCounterparty(client: ClientData) {
    const url = `${this.apiUrl}/entity/counterparty`;
    const body = {
      name: client.full_name,
      phone: client.phone,
      email: client.email,
      inn: client.inn,
      legalAddress: client.address,
      companyType: client.org_type === "LEGAL" ? "legal" : "individual"
    };

    return this.http.post(url, body);
  }

  // Создание заявки на поставку
  async createSupply(clientId: string, order: OrderData) {
    const clientMeta = {
      meta: {
        href: `${this.apiUrl}/entity/counterparty/${clientId}`,
        type: "counterparty",
        mediaType: "application/json"
      }
    };

    const orgMeta = {
      meta: {
        href: `${this.apiUrl}/entity/organization/${ORGANIZATION_ID}`,
        type: "organization",
        mediaType: "application/json"
      }
    };

    const storeMeta = {
      meta: {
        href: `${this.apiUrl}/entity/store/${STORE_ID}`,
        type: "store",
        mediaType: "application/json"
      }
    };

    // позиции
    const positions = await Promise.all(
      order.positions.map(async (pos) => {
        const product = await this.createProduct(pos);
        return {
          quantity: pos.quantity,
          price: 100,
          assortment: {
            meta: product.meta
          }
        };
      })
    );

    const brandValue = order.positions[0]?.brand || "Не указан";

    const url = `${this.apiUrl}/entity/supply`;

    const body = {
      agent: clientMeta,
      organization: orgMeta,
      store: storeMeta,
      description: order.workInstructions || "Нет инструкций",
      applicable: false,
      attributes: [
        { id: MS_BRAND_ID, value: brandValue }
      ],
      positions
    };

    return this.http.post(url, body);
  }

  // Создание товара
  private async createProduct(pos: OrderPositionData) {
    const url = `${this.apiUrl}/entity/product`;
    const body = {
      name: `${pos.name} (${pos.color})`,
      article: pos.vendorCode,
      attributes: [
        { id: MS_SIZE_ID, value: pos.size },
        { id: MS_COLOR_ID, value: pos.color }
      ]
    };

    return this.http.post(url, body);
  }
}

// --- Dadata Client ---

export class DadataClient {
  private token: string;
  private apiUrl =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";

  constructor(token: string) {
    this.token = token;
  }

  async getByInn(inn: string) {
    const res = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Token ${this.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: inn })
    });

    if (!res.ok) {
      console.error(`Ошибка Dadata ${res.status}: ${await res.text()}`);
      return null;
    }

    const data = await res.json();
    return data.suggestions?.[0]?.data || null;
  }
}
