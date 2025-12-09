import { MSClient } from "./client";

export class CounterpartyService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  findByEmail(email: string) {
    return this.client.request(`/entity/counterparty?filter=email=${email}`);
  }
}
