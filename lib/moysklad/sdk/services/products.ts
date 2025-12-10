import { MSClient } from "../../client";
import { MSProduct } from "../../types";

export class ProductsService {
  constructor(private client: MSClient) {}

  async list(limit: number = 200) {
    const res = await this.client.get("/entity/product", { limit });
    return res.rows as MSProduct[];
  }

  async getById(id: string) {
    return await this.client.get(`/entity/product/${id}`);
  }
}
