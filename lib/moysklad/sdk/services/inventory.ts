export class InventoryService {
  constructor(private client: any) {}

  async list(limit: number = 200) {
    return await this.client.get("/report/stock/all", { limit });
  }
}
