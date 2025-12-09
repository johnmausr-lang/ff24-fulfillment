import { MoyskladClient } from "../../client";

export class CounterpartyService {
  constructor(private client: MoyskladClient) {}

  async list(limit = 100) {
    return await this.client.get("/entity/counterparty", { limit });
  }

  async findByEmail(email: string) {
    return await this.client.get("/entity/counterparty", {
      filter: `email=${email}`,
      limit: 1,
    });
  }

  async getById(id: string) {
    return await this.client.get(`/entity/counterparty/${id}`);
  }

  async create(data: any) {
    return await this.client.post("/entity/counterparty", data);
  }

  async update(id: string, data: any) {
    return await this.client.put(`/entity/counterparty/${id}`, data);
  }
}
