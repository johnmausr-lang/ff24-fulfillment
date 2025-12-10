import { MSClient } from "../../client";

export class InventoryService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  /**
   * Общий отчёт остатков по складам
   */
  async list(limit: number = 200) {
    return await this.client.get("/report/stock/all", { limit });
  }

  /**
   * Остатки по конкретному складу
   */
  async byStore(storeId: string, limit: number = 200) {
    return await this.client.get("/report/stock/all", {
      filter: `store=${storeId}`,
      limit,
    });
  }

  /**
   * Остатки по конкретному товару
   */
  async byProduct(productId: string) {
    return await this.client.get("/report/stock/all", {
      filter: `assortmentId=${productId}`,
      limit: 1,
    });
  }
}
