import { MSClient } from "../../client";

export class OrdersService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  async list(limit: number = 50) {
    return await this.client.get("/entity/customerorder", { limit });
  }

  async getById(id: string) {
    return await this.client.get(`/entity/customerorder/${id}`);
  }
}
