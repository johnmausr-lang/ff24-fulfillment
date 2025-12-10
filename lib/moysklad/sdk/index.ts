import { MSClient } from "./client";
import { OrdersService } from "./orders";
import { ProductsService } from "./products";
import { InventoryService } from "./inventory";
import { CounterpartyService } from "./counterparties";

export function createMoyskladSDK() {
  const token = process.env.MOYSKLAD_TOKEN!;
  const client = new MSClient(token);

  return {
    client,
    orders: new OrdersService(client),
    products: new ProductsService(client),
    inventory: new InventoryService(client),
    counterparties: new CounterpartyService(client),
  };
}
