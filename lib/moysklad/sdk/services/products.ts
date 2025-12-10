import { MSClient } from "../../client";

export class ProductsService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  /**
   * Список товаров (все, без фильтра)
   */
  async list(limit: number = 100) {
    return await this.client.get("/entity/product", { limit });
  }

  /**
   * Получить товар по ID
   */
  async getById(id: string) {
    return await this.client.get(`/entity/product/${id}`);
  }
}
