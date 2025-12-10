import { MSClient } from "../../client";

export class SupplyService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  /**
   * Создать документ "Приёмка"
   */
  async create(payload: any) {
    return await this.client.post("/entity/supply", payload);
  }

  /**
   * Получить документ по ID
   */
  async getById(id: string) {
    return await this.client.get(`/entity/supply/${id}`);
  }

  /**
   * Получить список приёмок
   */
  async list(limit: number = 50) {
    return await this.client.get("/entity/supply", { limit });
  }
}
