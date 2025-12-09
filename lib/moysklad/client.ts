// lib/moysklad/client.ts

export class MoyskladClient {
  private baseUrl = "https://api.moysklad.ru/api/remap/1.2";

  constructor(private token: string) {
    if (!token) {
      throw new Error("MoySklad token is missing");
    }
  }

  /**
   * Базовый запрос к API МойСклад.
   * Это private-метод — его нельзя вызывать извне.
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

  // ------------------------------
  //        ПУБЛИЧНЫЕ МЕТОДЫ
  // ------------------------------

  /**
   * Получить список заказов
   */
  async getOrders(limit = 50) {
    return this.request(`/entity/customerorder?limit=${limit}`);
  }

  /**
   * Получить один заказ
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
   * Получить остатки товаров
   */
  async getStock() {
    return this.request(`/report/stock/all`);
  }

  /**
   * Получить товары (номенклатура)
   */
  async getProducts(limit = 200) {
    return this.request(`/entity/product?limit=${limit}`);
  }

  /**
   * Найти контрагента по email
   */
  async findCounterpartyByEmail(email: string) {
    return this.request(`/entity/counterparty?filter=email=${email}`);
  }
}
