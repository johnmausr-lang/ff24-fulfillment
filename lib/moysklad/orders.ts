import { MoyskladClient } from "./client";

export class OrdersService {
  client: MoyskladClient;

  constructor(client: MoyskladClient) {
    this.client = client;
  }

  async list() {
    const res = await this.client.getOrders();
    return res?.rows ?? [];
  }
}
