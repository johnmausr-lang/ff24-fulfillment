import { MSClient } from "../../client";

export interface MSOrder {
  id: string;
  name: string;
  description?: string;
  created?: string;
}

export class OrdersService {
  private client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  async list(limit: number = 50): Promise<MSOrder[]> {
    const res = await this.client.get("/entity/customerorder", { limit });
    return res.rows ?? [];
  }

  async getById(id: string): Promise<MSOrder> {
    return await this.client.get(`/entity/customerorder/${id}`);
  }
}
