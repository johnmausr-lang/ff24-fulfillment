import { MSClient } from "../client";
import { MSInventoryRow } from "../types";

export class InventoryService {
  constructor(private client: MSClient) {}

  async list(params: { limit?: number } = {}): Promise<MSInventoryRow[]> {
    const res = await this.client.get("/report/stock/all", params);
    return res.rows ?? [];
  }
}
