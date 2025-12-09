import { MoyskladClient } from "../../client";

export class CounterpartyService {
  constructor(private client: MoyskladClient) {}

  // Получить список всех контрагентов
  async list(limit = 100) {
    return await this.client.get("/entity/counterparty", { limit });
  }

  // Поиск по email
  async findByEmail(email: string) {
    return await this.client.get("/entity/counterparty", {
      filter: `email=${email}`,
      limit: 1,
    });
  }

  // 🔥 ДОБАВЛЕНО: получение контрагента по ID
  async getById(id: string) {
    return await this.client.get(`/entity/counterparty/${id}`);
  }

  // Создать контрагента
  async create(data: any) {
    return await this.client.post("/entity/counterparty", data);
  }

  // Обновить контрагента
  async update(id: string, data: any) {
    return await this.client.put(`/entity/counterparty/${id}`, data);
  }
}
