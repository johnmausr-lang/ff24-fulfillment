import { MSClient } from "@/lib/moysklad/client";
import { MSCounterparty } from "@/lib/moysklad/types";

export class CounterpartyService {
  client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  /**
   * Найти контрагента по email (точное совпадение)
   */
  async findByEmail(email: string): Promise<MSCounterparty | null> {
    const res = await this.client.get("/entity/counterparty", {
      filter: `email=${email}`,
      limit: 1,
    });

    return res?.rows?.[0] ?? null;
  }

  /**
   * Получить контрагента по ID
   */
  async getById(id: string): Promise<MSCounterparty | null> {
    try {
      return await this.client.get(`/entity/counterparty/${id}`);
    } catch {
      return null;
    }
  }
}
