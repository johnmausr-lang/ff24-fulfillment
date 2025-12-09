// app/api/inventory/route.ts

import { NextResponse } from "next/server";
import { MoyskladClient } from "@/lib/moysklad/client";
import { InventoryService } from "@/lib/moysklad/inventory";

export async function GET() {
  try {
    const token = process.env.MOYSKLAD_TOKEN!;
    const client = new MoyskladClient(token);
    const inventory = new InventoryService(client);

    const list = await inventory.list();
    return NextResponse.json({ success: true, data: list });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
