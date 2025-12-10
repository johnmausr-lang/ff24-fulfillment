import { MSClient } from "../../client";
import { MSOrder } from "../../types";

export class OrdersService {
  constructor(private client: MSClient) {}

  async list(limit: number = 100) {
    const res = await this.client.get("/entity/customerorder", { limit });
    return res.rows as MSOrder[];
  }

  async getById(id: string) {
    return await this.client.get(`/entity/customerorder/${id}`);
  }
}
