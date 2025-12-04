// app/api/orders/new/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MoySkladClient, ApiError } from "@/lib/ms-client";
import { MOYSKLAD_TOKEN } from "@/lib/config";

const COOKIE_NAME = "ff24_token";
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const payload: any = jwt.verify(token, JWT_SECRET);

    const { positions } = await req.json();

    const ms = new MoySkladClient(MOYSKLAD_TOKEN);

    const body = {
      name: `Заказ от клиента ${payload.email}`,
      agent: {
        meta: {
          href: `${ms["apiUrl"]}/entity/counterparty/${payload.id}`,
          type: "counterparty",
          mediaType: "application/json",
        },
      },
      positions: positions.map((p: any) => ({
        quantity: p.quantity,
        assortment: {
          meta: {
            href: `${ms["apiUrl"]}/entity/product/${p.productId}`,
            type: "product",
            mediaType: "application/json",
          },
        },
      })),
    };

    const url = `${ms["apiUrl"]}/entity/customerorder`;
    const created = await ms["http"].post(url, body);

    return NextResponse.json({ ok: true, id: created.id });
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
