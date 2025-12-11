import { MSClient } from "../../client";
import { MSCounterparty } from "../../types";

export class CounterpartyService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  async getById(id: string): Promise<MSCounterparty | null> {
    return this.client.get(`/entity/counterparty/${id}`);
  }

  async findByEmail(email: string): Promise<MSCounterparty | null> {
    const res = await this.client.get("/entity/counterparty", {
      search: email,
      limit: 10,
    });

    return res?.rows?.find((c: any) => c.email === email) ?? null;
  }
}
