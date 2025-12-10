import { MSClient } from "../../client";
import { MSCounterparty } from "../../types";

export class CounterpartyService {
  constructor(private client: MSClient) {}

  async list() {
    const res = await this.client.get("/entity/counterparty", { limit: 200 });
    return res.rows as MSCounterparty[];
  }

  async getById(id: string) {
    return await this.client.get(`/entity/counterparty/${id}`);
  }

  async findByEmail(email: string) {
    const res = await this.client.get("/entity/counterparty", {
      filter: `email=${email}`,
    });
    return res.rows?.[0] || null;
  }
}
