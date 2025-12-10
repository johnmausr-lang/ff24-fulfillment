export class InventoryService {
  constructor(private client: any) {}

  /**
   * Получить весь отчёт по остаткам
   */
  async list(limit: number = 200) {
    return await this.client.get("/report/stock/all", { limit });
  }

  /**
   * Получить остатки по конкретному складу
   */
  async byStore(storeId: string, limit: number = 200) {
    return await this.client.get("/report/stock/all", {
      filter: `store=${storeId}`,
      limit,
    });
  }

  /**
   * Получить остатки по конкретному товару
   */
  async byProduct(productId: string) {
    return await this.client.get("/report/stock/all", {
      filter: `assortmentId=${productId}`,
      limit: 1,
    });
  }
}
