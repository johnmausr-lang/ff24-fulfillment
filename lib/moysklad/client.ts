// lib/moysklad/client.ts

export class MoyskladClient {
  private baseUrl = "https://api.moysklad.ru/api/remap/1.2";

  constructor(private token: string) {
    if (!token) {
      throw new Error("MoySklad token is missing");
    }
  }

  /**
   * Выполняет запрос к API МойСклад с единой обработкой ошибок.
   */
  private async request(path: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        "Authorization": `Bearer ${this.token}`,
        "Content-Type": "application/json;charset=utf-8",
        ...(options.headers ?? {})
      },
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`MoySklad API error: ${response.status} ${text}`);
    }

    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  /**
   * Получить список заказов
   */
  async getOrders(limit = 50) {
    return this.request(`/entity/customerorder?limit=${limit}`);
  }

  /**
   * Получить один заказ по ID
   */
  async getOrder(id: string) {
    return this.request(`/entity/customerorder/${id}`);
  }

  /**
   * Создать заказ
   */
  async createOrder(data: any) {
    return this.request(`/entity/customerorder`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * Получить остатки товара
   */
  async getStock() {
    return this.request(`/report/stock/all`);
  }

  /**
   * Получить контрагента по email (полезно для логина)
   */
  async findCounterpartyByEmail(email: string) {
    return this.request(`/entity/counterparty?filter=email=${email}`);
  }
}
