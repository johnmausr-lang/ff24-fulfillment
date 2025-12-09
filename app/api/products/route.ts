import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";

export async function GET() {
  try {
    const ms = createMoyskladSDK();
    const data = await ms.products.list();

    return NextResponse.json({ success: true, data: data.rows });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
