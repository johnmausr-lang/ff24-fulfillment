import { MSClient } from "../../client";

export interface MSInventoryRow {
  assortment: { meta: any; id?: string; name?: string };
  stock: number;
  freeStock: number;
}

export class InventoryService {
  private client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  async list(limit: number = 200): Promise<MSInventoryRow[]> {
    const res = await this.client.get("/report/stock/all", { limit });
    return res.rows ?? [];
  }

  async byProduct(productId: string): Promise<MSInventoryRow | null> {
    const res = await this.client.get("/report/stock/all", {
      filter: `assortmentId=${productId}`,
      limit: 1,
    });

    return res.rows?.[0] ?? null;
  }
}
