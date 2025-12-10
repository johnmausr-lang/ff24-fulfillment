export class CounterpartyService {
  constructor(private client: any) {}

  async findByEmail(email: string) {
    return await this.client.get("/entity/counterparty", {
      filter: `email=${email}`
    });
  }

  async getById(id: string) {
    return await this.client.get(`/entity/counterparty/${id}`);
  }
}
