import { MSClient } from "../../client";

export interface MSCounterparty {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export class CounterpartyService {
  private client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  async findByEmail(email: string): Promise<MSCounterparty | null> {
    const res = await this.client.get("/entity/counterparty", {
      filter: `email=${email}`,
    });

    return res.rows?.[0] ?? null;
  }

  async getById(id: string): Promise<MSCounterparty> {
    return await this.client.get(`/entity/counterparty/${id}`);
  }
}
