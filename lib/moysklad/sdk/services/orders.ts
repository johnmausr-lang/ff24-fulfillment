import { MSClient } from "@/lib/moysklad/client";
import { MSOrder } from "@/lib/moysklad/types";

export class OrdersService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  /**
   * Список заказов
   * @param params { limit?: number, expand?: string }
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
   * Получить один заказ
   */
  async getById(id: string): Promise<MSOrder | null> {
    return this.client.get(`/entity/customerorder/${id}`);
  }
}
