import { MoyskladClient } from "./client";

export class InventoryService {
  client: MoyskladClient;

  constructor(client: MoyskladClient) {
    this.client = client;
  }

  /**
   * Получение остатков
   */
  async list() {
    const storeID = process.env.STORE_ID!;
    const res = await this.client.getStock(storeID);
    return res?.rows ?? [];
  }
}
