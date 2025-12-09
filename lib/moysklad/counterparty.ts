// lib/moysklad/counterparty.ts

import { MoyskladClient } from "./client";

export class CounterpartyService {
  constructor(private client: MoyskladClient) {}

  async findByEmail(email: string) {
    const res = await this.client.findCounterpartyByEmail(email);
    return res?.rows?.[0] ?? null;
  }
}
