import { MSClient } from "./client";

export class ProductsService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  list(limit = 200) {
    return this.client.request(`/entity/product?limit=${limit}`);
  }
}
