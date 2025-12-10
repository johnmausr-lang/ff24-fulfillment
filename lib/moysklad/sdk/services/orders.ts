import { MSClient } from "../client";
import { MSOrder } from "../types";

export class OrdersService {
  constructor(private client: MSClient) {}

  async list(params: { limit?: number; expand?: string } = {}): Promise<MSOrder[]> {
    const res = await this.client.get("/entity/customerorder", params);
    return res.rows ?? [];
  }

  async getById(id: string): Promise<MSOrder> {
    return await this.client.get(`/entity/customerorder/${id}`);
  }
}
