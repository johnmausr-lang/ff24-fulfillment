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
   Класс ошибок
================================================================ */
export class ApiError extends Error {
  constructor(message: string, public status: number = 500, public details?: any) {
    super(message);
    this.name = "ApiError";
  }
}

/* ================================================================
   Низкоуровневый HTTP клиент с МАКСИМАЛЬНЫМИ ЛОГАМИ
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
    const finalOptions = {
      ...options,
      headers: { ...this.headers, ...(options.headers || {}) },
    };

    // 🔥 Логируем ПОЛНЫЙ запрос
    console.log("📤 MS API REQUEST →", {
      url,
      method: finalOptions.method,
      headers: finalOptions.headers,
      body: finalOptions.body ?? null,
    });

    let response: Response;
    try {
      response = await fetch(url, finalOptions);
    } catch (err) {
      console.error("❌ FETCH ERROR:", err);
      throw new ApiError("Ошибка сети при запросе к МойСклад", 500, err);
    }

    const text = await response.text();

    // 🔥 Логируем ПОЛНЫЙ ответ
    console.log("📥 MS API RESPONSE ←", {
      url,
      status: response.status,
      ok: response.ok,
      raw: text,
      contentType: response.headers.get("content-type"),
    });

    if (!response.ok) {
      throw new ApiError(
        `Ошибка API МойСклад (${response.status})`,
        response.status,
        text // сохраняем тело ответа
      );
    }

    try {
      return JSON.parse(text);
    } catch {
      return text;
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

/* ================================================================
   Основной API-клиент МойСклад
================================================================ */
export class MoySkladClient {
  private apiUrl = MS_API_URL;
  private http: MsHttpClient;

  constructor(token: string) {
    this.http = new MsHttpClient(token);
  }

  /* ------------------------------------------------------------
     🔍 Поиск клиента по телефону
  ------------------------------------------------------------ */
  async findCounterpartyByPhone(phone: string): Promise<any | null> {
    const digits = phone.replace(/\D/g, "");

    const url = `${this.apiUrl}/entity/counterparty?filter=phone~${digits}`;

    console.log("🔎 Ищем контрагента по телефону:", digits);

    const data = await this.http.get(url);

    console.log("🔎 Результат поиска phone~:", {
      digits,
      found: data?.rows?.length || 0,
      rows: data?.rows,
    });

    return data?.rows?.[0] ?? null;
  }

  /* ------------------------------------------------------------
     🔍 Поиск клиента по email / поиску
  ------------------------------------------------------------ */
  async findCounterparty(query: string): Promise<any | null> {
    const url = `${this.apiUrl}/entity/counterparty?search=${encodeURIComponent(
      query
    )}`;

    console.log("🔎 Ищем контрагента через search:", query);

    const data = await this.http.get(url);

    console.log("🔎 Результат поиска search:", {
      query,
      found: data?.rows?.length || 0,
      rows: data?.rows,
    });

    return data?.rows?.[0] ?? null;
  }

  /* ------------------------------------------------------------
     Получить клиента по ID
  ------------------------------------------------------------ */
  async getCounterparty(id: string): Promise<any> {
    console.log("🔎 getCounterparty:", id);
    return this.http.get(`${this.apiUrl}/entity/counterparty/${id}`);
  }

  /* ------------------------------------------------------------
     📦 Проверка остатков
  ------------------------------------------------------------ */
  async checkInventory(): Promise<any[]> {
    const url = `${this.apiUrl}/report/stock/bystore?store.id=${STORE_ID}`;

    console.log("📦 Получаем остатки товаров...");

    const data = await this.http.get(url);

    console.log("📦 Остатков получено:", data?.rows?.length || 0);

    return (
      data?.rows?.map((row: any) => ({
        name: row.assortment?.name || "",
        code: row.assortment?.article || "",
        stock: row.stock || 0,
        reserve: row.reserve || 0,
        inTransit: row.inTransit || 0,
        productId: row.assortment?.id || "",
      })) ?? []
    );
  }

  /* ------------------------------------------------------------
     Создание контрагента
  ------------------------------------------------------------ */
  async createCounterparty(client: ClientData): Promise<any> {
    console.log("🧾 Создаём контрагента:", client);

    return this.http.post(`${this.apiUrl}/entity/counterparty`, {
      name: client.full_name,
      phone: client.phone,
      email: client.email,
      inn: client.inn,
      legalAddress: client.address,
      companyType: client.org_type === "LEGAL" ? "legal" : "individual",
    });
  }

  /* ------------------------------------------------------------
     Создание заявки
  ------------------------------------------------------------ */
  async createSupply(clientId: string, order: OrderData): Promise<any> {
    console.log("📦 Создаём заявку на поставку:", { clientId, order });

    const base = this.apiUrl;

    return this.http.post(`${base}/entity/supply`, {
      agent: {
        meta: {
          href: `${base}/entity/counterparty/${clientId}`,
          type: "counterparty",
          mediaType: "application/json",
        },
      },
      organization: {
        meta: {
          href: `${base}/entity/organization/${ORGANIZATION_ID}`,
          type: "organization",
          mediaType: "application/json",
        },
      },
      store: {
        meta: {
          href: `${base}/entity/store/${STORE_ID}`,
          type: "store",
          mediaType: "application/json",
        },
      },
      description: order.workInstructions || "Нет инструкций",
      applicable: false,
      attributes: [{ id: MS_BRAND_ID, value: order.positions[0]?.brand }],
      positions: await Promise.all(
        order.positions.map(async (pos) => {
          const product = await this.createProduct(pos);
          return {
            quantity: pos.quantity,
            price: 100,
            assortment: { meta: product.meta },
          };
        })
      ),
    });
  }

  /* ------------------------------------------------------------
     Создание товара
  ------------------------------------------------------------ */
  private async createProduct(pos: OrderPositionData): Promise<any> {
    console.log("🏷 Создаём товар:", pos);

    const body = {
      name: `${pos.name} (${pos.color})`,
      article: pos.vendorCode,
      attributes: [
        { id: MS_SIZE_ID, value: pos.size },
        { id: MS_COLOR_ID, value: pos.color },
      ],
    };

    return this.http.post(`${this.apiUrl}/entity/product`, body);
  }
}
