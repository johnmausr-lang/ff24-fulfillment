import { MSClient } from "../../client";
import { MSInventoryRow } from "../../types";

export class InventoryService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  async list(params: { limit?: number } = {}): Promise<MSInventoryRow[]> {
    const { limit = 200 } = params;

    const res = await this.client.get("/report/stock/all", {
      limit,
    });

    return res?.rows ?? [];
  }
}
