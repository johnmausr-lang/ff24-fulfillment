import { MSClient } from "../../client";

export class CounterpartyService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  /**
   * Найти контрагента по E-mail
   */
  async findByEmail(email: string) {
    return await this.client.get("/entity/counterparty", {
      filter: `email=${email}`,
    });
  }

  /**
   * Получить контрагента по ID
   */
  async getById(id: string) {
    return await this.client.get(`/entity/counterparty/${id}`);
  }
}
