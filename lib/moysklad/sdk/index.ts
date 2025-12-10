import { MSClient } from "../client";
import { OrdersService } from "./services/orders";
import { ProductsService } from "./services/products";
import { InventoryService } from "./services/inventory";
import { CounterpartyService } from "./services/counterparties";
import { SupplyService } from "./services/supply";

export function createMoyskladSDK() {
  const token = process.env.MOYSKLAD_TOKEN;

  if (!token) {
    throw new Error("MOYSKLAD_TOKEN env variable is missing");
  }

  const client = new MSClient(token);

  return {
    client,
    orders: new OrdersService(client),
    products: new ProductsService(client),
    inventory: new InventoryService(client),
    counterparties: new CounterpartyService(client),
    supply: new SupplyService(client),
  };
}

export type MoyskladSDK = ReturnType<typeof createMoyskladSDK>;
