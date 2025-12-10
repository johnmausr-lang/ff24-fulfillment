import { MSClient } from "./client";

export class InventoryService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  list(storeID: string) {
    return this.client.request(`/report/stock/all?store.id=${storeID}`);
  }
}
