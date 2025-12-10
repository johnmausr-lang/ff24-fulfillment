import { MSClient } from "../../client";

export interface MSSupply {
  id: string;
  name: string;
  description?: string;
  created?: string;
}

export class SupplyService {
  private client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  async list(limit: number = 50): Promise<MSSupply[]> {
    const res = await this.client.get("/entity/supply", { limit });
    return res.rows ?? [];
  }

  async getById(id: string): Promise<MSSupply> {
    return await this.client.get(`/entity/supply/${id}`);
  }

  async create(payload: any): Promise<MSSupply> {
    return await this.client.post(`/entity/supply`, payload);
  }
}
