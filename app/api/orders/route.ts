import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const ms = createMoyskladSDK();

    // 1) Загружаем только limit
    const data = await ms.orders.list(100);

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (err: any) {
    console.error("ORDERS API ERROR:", err);

    return NextResponse.json(
      { success: false, error: err.message || "Error" },
      { status: 500 }
    );
  }
}
