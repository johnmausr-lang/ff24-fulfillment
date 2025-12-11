import { MSClient } from "../../client";
import { MSSupply } from "../../types";

export class SupplyService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  async create(payload: any): Promise<MSSupply> {
    return this.client.post("/entity/supply", payload);
  }

  async getById(id: string): Promise<MSSupply | null> {
    return this.client.get(`/entity/supply/${id}`);
  }
}
