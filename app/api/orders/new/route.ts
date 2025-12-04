// app/api/orders/new/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MoySkladClient } from "@/lib/ms-client";
import { MOYSKLAD_TOKEN } from "@/lib/config";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get("ff24_token");
    if (!cookie)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(cookie.value, JWT_SECRET) as any;
    const clientId = decoded.id;

    const body = await req.json();

    console.log("📦 NEW ORDER BODY:", body);

    const ms = new MoySkladClient(MOYSKLAD_TOKEN);

    // ⬇⬇⬇ ВАЖНО — теперь создаём CustomerOrder, не Supply
    const result = await ms.createCustomerOrder(clientId, {
      positions: body.positions,
      workInstructions: body.workInstructions ?? "",
    });

    console.log("🟢 CUSTOMER ORDER CREATED:", result);

    return NextResponse.json({ ok: true, order: result });
  } catch (e) {
    console.error("❌ ERROR CREATING ORDER:", e);
    return NextResponse.json(
      { message: "Server error", error: String(e) },
      { status: 500 }
    );
  }
}
