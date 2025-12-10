import { MSClient } from "../client";
import { MSCounterparty } from "../types";

export class CounterpartyService {
  constructor(private client: MSClient) {}

  async getById(id: string): Promise<MSCounterparty> {
    return await this.client.get(`/entity/counterparty/${id}`);
  }

  async findByEmail(email: string): Promise<MSCounterparty | null> {
    const res = await this.client.get("/entity/counterparty", {
      filter: `email=${email}`
    });

    return res?.rows?.[0] ?? null;
  }
}
