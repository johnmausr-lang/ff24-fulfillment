import { MSClient } from "../../client";
import { MSSupply } from "../../types";

export class SupplyService {
  constructor(private client: MSClient) {}

  async create(body: any): Promise<MSSupply> {
    return await this.client.post("/entity/supply", body);
  }
}
