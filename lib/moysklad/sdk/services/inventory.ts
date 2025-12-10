import { MSClient } from "../../client";
import { MSInventoryRow } from "../../types";

export class InventoryService {
  constructor(private client: MSClient) {}

  async list(limit: number = 200) {
    const res = await this.client.get("/report/stock/all", { limit });
    return res.rows as MSInventoryRow[];
  }
}
