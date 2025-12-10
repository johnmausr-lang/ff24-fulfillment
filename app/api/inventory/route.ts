import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";

export async function GET() {
  try {
    const ms = createMoyskladSDK();

    const data = await ms.inventory.list(200);

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (err: any) {
    console.error("INVENTORY API ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: err?.message ?? "Unexpected server error",
      },
      { status: 500 }
    );
  }
}
