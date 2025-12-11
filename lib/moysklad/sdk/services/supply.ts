import { MSClient } from "../../client";
import { MSSupply } from "../../types";

export class SupplyService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  /**
   * Создать документ "Приёмка"
   */
  async create(payload: any): Promise<MSSupply> {
    return this.client.post("/entity/supply", payload);
  }

  /**
   * Получить документ приёмки по ID
   */
  async getById(id: string): Promise<MSSupply | null> {
    return this.client.get(`/entity/supply/${id}`);
  }
}
