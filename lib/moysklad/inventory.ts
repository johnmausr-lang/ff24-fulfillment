// lib/moysklad/inventory.ts

import { MoyskladClient } from "./client";

export class InventoryService {
  constructor(private client: MoyskladClient) {}

  /**
   * Получение остатков товаров
   */
  async list() {
    const res = await this.client.getStock();
    return res?.rows ?? [];
  }
}
