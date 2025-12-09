import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ms = createMoyskladSDK();

    const order = await ms.orders.create(body);

    return NextResponse.json({ success: true, data: order });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
