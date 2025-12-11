import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ms = createMoyskladSDK();

    // <-- FIX: передаём объект, а не число
    const data = await ms.products.list({
      limit: 500
    });

    const filtered = data.filter((p: any) => {
      return Object.entries(body).every(([key, val]) => {
        if (!val) return true;
        return (p[key] ?? "").toLowerCase().includes(String(val).toLowerCase());
      });
    });

    return NextResponse.json({
      success: true,
      data: filtered
    });

  } catch (err: any) {
    console.error("PRODUCT FILTER API ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message ?? "Products filter error" },
      { status: 500 }
    );
  }
}
