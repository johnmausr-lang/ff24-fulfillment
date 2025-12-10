import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";

export async function GET() {
  try {
    const ms = createMoyskladSDK();

    const stock = await ms.inventory.list();

    return NextResponse.json({
      success: true,
      data: stock,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Inventory error" },
      { status: 500 }
    );
  }
}
