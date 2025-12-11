import { MSClient } from "../../client";
import { MSOrder } from "../../types";

export class OrdersService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  /**
   * Получить список заказов
   */
  async list(params: { limit?: number; expand?: string } = {}): Promise<MSOrder[]> {
    const { limit = 100, expand } = params;

    const res = await this.client.get("/entity/customerorder", {
      limit,
      expand,
    });

    return res?.rows ?? [];
  }

  /**
   * Получить заказ по ID
   */
  async getById(id: string): Promise<MSOrder | null> {
    return this.client.get(`/entity/customerorder/${id}`);
  }
}
