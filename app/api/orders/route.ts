// app/api/orders/route.ts

import { NextResponse } from "next/server";
import { MoyskladClient } from "@/lib/moysklad/client";
import { OrdersService } from "@/lib/moysklad/orders";

export async function GET() {
  try {
    const token = process.env.MOYSKLAD_TOKEN!;
    const client = new MoyskladClient(token);
    const orders = new OrdersService(client);

    const list = await orders.list(100);
    return NextResponse.json({ success: true, data: list });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const token = process.env.MOYSKLAD_TOKEN!;
    const client = new MoyskladClient(token);
    const orders = new OrdersService(client);

    const created = await orders.create(payload);
    return NextResponse.json({ success: true, data: created });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
