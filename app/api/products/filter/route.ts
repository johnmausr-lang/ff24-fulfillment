import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ms = createMoyskladSDK();

    const data = await ms.products.list(500);

    const filtered = data.filter((p: any) => {
      return Object.entries(body).every(([key, val]) => {
        if (!val) return true;
        return String(p[key] ?? "").toLowerCase().includes(String(val).toLowerCase());
      });
    });

    return NextResponse.json({ success: true, data: filtered });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: err.status || 500 }
    );
  }
}
