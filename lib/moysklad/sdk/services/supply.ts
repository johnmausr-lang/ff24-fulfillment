export class SupplyService {
  constructor(private client: any) {}

  /**
   * Создать документ "Приёмка"
   * https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokhody-priemka
   */
  async create(payload: any) {
    return await this.client.post("/entity/supply", payload);
  }

  /**
   * Получить документ Приёмки по ID
   */
  async getById(id: string) {
    return await this.client.get(`/entity/supply/${id}`);
  }

  /**
   * Список приходных накладных
   */
  async list(limit = 50) {
    return await this.client.get("/entity/supply", { limit });
  }
}
