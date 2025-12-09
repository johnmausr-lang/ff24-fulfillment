export class MoyskladClient {
  private token: string;
  private base = "https://api.moysklad.ru/api/remap/1.2";

  constructor(token: string) {
    this.token = token;
  }

  private async call(endpoint: string) {
    const res = await fetch(this.base + endpoint, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`MoySklad error: ${res.statusText}`);
    return res.json();
  }

  // Заказы
  getOrders() {
    return this.call("/entity/customerorder?limit=100");
  }

  // Остатки
  getStock(storeID: string) {
    return this.call(`/report/stock/all?store.id=${storeID}`);
  }

  // Номенклатура
  getProducts() {
    return this.call("/entity/product?limit=200");
  }

  // Поиск контрагента
  findCounterpartyByEmail(email: string) {
    return this.call(`/entity/counterparty?filter=email=${email}`);
  }
}
