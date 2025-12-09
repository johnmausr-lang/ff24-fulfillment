import { MSClient } from "./client";

export class OrdersService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  list(limit = 50) {
    return this.client.request(`/entity/customerorder?limit=${limit}`);
  }
}
