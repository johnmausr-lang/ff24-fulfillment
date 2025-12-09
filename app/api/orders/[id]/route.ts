// app/api/orders/[id]/route.ts

import { NextResponse } from "next/server";
import { MoyskladClient } from "@/lib/moysklad/client";
import { OrdersService } from "@/lib/moysklad/orders";

interface Params {
  params: { id: string }
}

export async function GET(_: Request, { params }: Params) {
  try {
    const token = process.env.MOYSKLAD_TOKEN!;
    const client = new MoyskladClient(token);
    const orders = new OrdersService(client);

    const order = await orders.getById(params.id);
    return NextResponse.json({ success: true, data: order });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
