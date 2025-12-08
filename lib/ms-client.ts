// lib/ms-client.ts
import {
  MS_API_URL,
  ORGANIZATION_ID,
  STORE_ID,
  MS_BRAND_ID,
  MS_COLOR_ID,
  MS_SIZE_ID,
} from "./config";

import {
  OrderPositionData,
  CustomerOrderPayload,
} from "./models";

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
// Низкоуровневый HTTP клиент
// ==================================================
class MsHttpClient {
  private headers: Record<string, string>;

  constructor(private token: string) {
    this.headers = {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/json;charset=utf-8",
      "Content-Type": "application/json;charset=utf-8",
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
  private http: MsHttpClient;
  private apiUrl = MS_API_URL;

  constructor(token: string) {
    this.http = new MsHttpClient(token);
  }

  // --------------------------------------------------
  // 🔍 Поиск контрагента
  // --------------------------------------------------
  async findCounterparty(query: string) {
    const url = `${this.apiUrl}/entity/counterparty?search=${encodeURIComponent(
      query
    )}`;
    const data = await this.http.get(url);
    return data?.rows?.[0] ?? null;
  }

  // --------------------------------------------------
  // 👤 Получить контрагента по ID
  // --------------------------------------------------
  async getCounterpartyById(id: string) {
    const url = `${this.apiUrl}/entity/counterparty/${id}`;
    return this.http.get(url);
  }

  // --------------------------------------------------
  // 📦 Остатки
  // --------------------------------------------------
  async checkInventory() {
    const url = `${this.apiUrl}/report/stock/bystore?store.id=${STORE_ID}`;
    const data = await this.http.get(url);
    return data?.rows ?? [];
  }

  // --------------------------------------------------
  // 🏷 Создание товара (исправлено!)
  // МойСклад требует наличие attributeMetadata.meta
  // --------------------------------------------------
  async createProduct(pos: OrderPositionData) {
    const url = `${this.apiUrl}/entity/product`;

    const body = {
      name: `${pos.name} (${pos.color})`,
      article: pos.vendorCode,
      attributes: [
        { meta: { href: `${this.apiUrl}/entity/product/metadata/attributes/${MS_SIZE_ID}`, type: "attributemetadata", mediaType: "application/json" }, value: pos.size },
        { meta: { href: `${this.apiUrl}/entity/product/metadata/attributes/${MS_COLOR_ID}`, type: "attributemetadata", mediaType: "application/json" }, value: pos.color },
      ],
    };

    return this.http.post(url, body);
  }

  // --------------------------------------------------
  // 🧾 Создание заказа покупателя
  // --------------------------------------------------
  async createCustomerOrder(clientId: string, payload: CustomerOrderPayload) {
    console.log("📦 ПОЛУЧЕН ЗАКАЗ:", payload);

    const agentMeta = {
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

    // ---- создаём позиционные товары ----
    const positions = await Promise.all(
      payload.positions.map(async (pos) => {
        const product = await this.createProduct(pos);

        return {
          quantity: pos.quantity,
          price: 10000, // ВАЖНО: цена в копейках
          assortment: { meta: product.meta },
        };
      })
    );

    const body = {
      name: `Заказ от клиента ${clientId}`,
      agent: agentMeta,
      organization: orgMeta,
      store: storeMeta,
      description: payload.comment ?? "",
      positions,
    };

    const url = `${this.apiUrl}/entity/customerorder`;

    return this.http.post(url, body);
  }

  // --------------------------------------------------
  // 📜 Получение заказов клиента
  // ВАЖНО: работает только через meta.href, иначе ошибка 1014!
  // --------------------------------------------------
  async getCustomerOrders(clientId: string) {
    const agentHref = `${this.apiUrl}/entity/counterparty/${clientId}`;

    const url = `${this.apiUrl}/entity/customerorder?filter=agent=${encodeURIComponent(
      agentHref
    )}`;

    console.log("📦 ЗАПРОС ЗАКАЗОВ:", url);

    const data = await this.http.get(url);
    return data?.rows ?? [];
  }
}
