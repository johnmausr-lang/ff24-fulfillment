import { MSClient } from "../client";
import { MSCounterparty } from "../types";

export class CounterpartyService {
  constructor(private client: MSClient) {}

  async list(params: { limit?: number; search?: string } = {}): Promise<MSCounterparty[]> {
    const res = await this.client.get("/entity/counterparty", params);
    return res.rows ?? [];
  }

  async getById(id: string): Promise<MSCounterparty> {
    return await this.client.get(`/entity/counterparty/${id}`);
  }
}
