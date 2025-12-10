import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";

export async function GET() {
  try {
    const ms = createMoyskladSDK();

    // Загружаем список товаров (200 штук)
    const products = await ms.products.list(200);

    return NextResponse.json({
      success: true,
      data: products,
    });

  } catch (err: any) {
    console.error("PRODUCTS API ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: err?.message ?? "Unexpected server error",
      },
      { status: 500 }
    );
  }
}
