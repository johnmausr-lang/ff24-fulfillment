import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";

export async function GET() {
  try {
    const ms = createMoyskladSDK();

    const data = await ms.orders.list({
      limit: 100,
      expand: "positions"
    });

    return NextResponse.json({
      success: true,
      data
    });
  } catch (err: any) {
    console.error("ORDERS API ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
