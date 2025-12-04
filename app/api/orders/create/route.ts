// app/api/orders/create/route.ts

import { NextRequest, NextResponse } from "next/server";
import { MoySkladClient } from "@/lib/ms-client";
import jwt from "jsonwebtoken";
import { MOYSKLAD_TOKEN } from "@/lib/config";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get("ff24_token");
    if (!cookie) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(cookie.value, JWT_SECRET) as any;

    const body = await req.json();

    const payload = {
      clientId: decoded.id,
      order: body,  // передали заказ полностью
    };

    const ms = new MoySkladClient(MOYSKLAD_TOKEN);

    const response = await ms.createCustomerOrder(payload.clientId, payload.order);

    return NextResponse.json({ ok: true, order: response }, { status: 200 });

  } catch (e) {
    console.error("ORDER API ERROR:", e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
