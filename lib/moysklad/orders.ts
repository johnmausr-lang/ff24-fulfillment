// lib/moysklad/orders.ts

import { MoyskladClient } from "./client";

export class OrdersService {
  constructor(private client: MoyskladClient) {}

  /**
   * Получение списка заказов
   */
  async list(limit = 50) {
    const res = await this.client.getOrders(limit);
    return res?.rows ?? [];
  }

  /**
   * Получение одного заказа
   */
  async getById(id: string) {
    return this.client.getOrder(id);
  }

  /**
   * Создание заказа
   */
  async create(data: any) {
    return this.client.createOrder(data);
  }
}
