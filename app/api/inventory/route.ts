import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";

export async function GET() {
  try {
    const ms = createMoyskladSDK();
    const data = await ms.inventory.list(300);

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message, code: err.code },
      { status: err.status || 500 }
    );
  }
}
