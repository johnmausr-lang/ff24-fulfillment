import { MSClient } from "@/lib/moysklad/client";
import { MSInventoryRow } from "@/lib/moysklad/types";

export class InventoryService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  /**
   * Получить остатки на складе
   * @param params { limit?: number }
   */
  async list(params: { limit?: number } = {}): Promise<MSInventoryRow[]> {
    const { limit = 200 } = params;

    const res = await this.client.get("/report/stock/all", {
      limit,
    });

    return res?.rows ?? [];
  }
}
