import { MSClient } from "../../client";

export interface MSProduct {
  id: string;
  name: string;
  article?: string;
  code?: string;
  description?: string;
  image?: any;
}

export class ProductsService {
  private client: MSClient;

  constructor(client: MSClient) {
    this.client = client;
  }

  async list(limit: number = 100): Promise<MSProduct[]> {
    const res = await this.client.get("/entity/product", { limit });
    return res.rows ?? [];
  }

  async getById(id: string): Promise<MSProduct> {
    return await this.client.get(`/entity/product/${id}`);
  }
}
