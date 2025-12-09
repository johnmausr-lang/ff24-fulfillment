import { MSClient } from "./client";

export class OrdersService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  list(limit = 50) {
    return this.client.request(`/entity/customerorder?limit=${limit}`);
  }

  // 🔥 ДОБАВЛЕН НОВЫЙ МЕТОД
  getById(id: string) {
    return this.client.request(`/entity/customerorder/${id}`);
  }

  // Создание заказа
  create(payload: any) {
    return this.client.request(`/entity/customerorder`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
}
