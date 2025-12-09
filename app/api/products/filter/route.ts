import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";

export async function POST(req: Request) {
  const { brand, size, color } = await req.json();
  const ms = createMoyskladSDK();

  let query = "/entity/product?limit=200";

  if (brand) query += `&filter=productFolder=${brand}`;
  if (color) query += `&filter=color=${color}`;
  if (size) query += `&filter=size=${size}`;

  const data = await ms.client.request(query);

  return NextResponse.json({ success: true, data: data.rows });
}
