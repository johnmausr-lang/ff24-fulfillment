import { MSClient } from "../client";
import { MSProduct } from "../types";

export class ProductsService {
  constructor(private client: MSClient) {}

  async list(params: { limit?: number; search?: string } = {}): Promise<MSProduct[]> {
    const res = await this.client.get("/entity/product", params);
    return res.rows ?? [];
  }

  async getById(id: string): Promise<MSProduct> {
    return await this.client.get(`/entity/product/${id}`);
  }
}
