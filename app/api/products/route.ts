// app/api/products/route.ts

import { NextResponse } from "next/server";
import { MoyskladClient } from "@/lib/moysklad/client";

export async function GET() {
  try {
    const token = process.env.MOYSKLAD_TOKEN!;
    const client = new MoyskladClient(token);

    const data = await client.request("/entity/product?limit=200");

    return NextResponse.json({
      success: true,
      data: data?.rows || [],
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
