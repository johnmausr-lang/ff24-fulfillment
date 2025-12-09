import { NextResponse } from "next/server";
import { MoyskladClient } from "@/lib/moysklad/client";

export async function GET() {
  try {
    const client = new MoyskladClient(process.env.MOYSKLAD_TOKEN!);
    const data = await client.getOrders();

    return NextResponse.json({
      success: true,
      data: data.rows,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
