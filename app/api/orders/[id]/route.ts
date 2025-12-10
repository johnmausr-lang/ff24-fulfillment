import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ms = createMoyskladSDK();
    const order = await ms.orders.getById(params.id);

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}
