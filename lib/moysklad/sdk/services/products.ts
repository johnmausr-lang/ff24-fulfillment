import { MSClient } from "../../client";
import { MSProduct } from "../../types";

export class ProductsService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  /**
   * Получить список товаров
   */
  async list(params: { limit?: number; search?: string } = {}): Promise<MSProduct[]> {
    const { limit = 200, search } = params;

    const res = await this.client.get("/entity/product", {
      limit,
      search,
    });

    return res?.rows ?? [];
  }

  /**
   * Получить товар по ID
   */
  async getById(id: string): Promise<MSProduct | null> {
    return this.client.get(`/entity/product/${id}`);
  }
}
