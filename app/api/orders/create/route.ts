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

    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ message: "items[] required" }, { status: 400 });
    }

    const ms = new MoySkladClient(MOYSKLAD_TOKEN);

    const payload = {
      agent: {
        meta: {
          href: `https://api.moysklad.ru/api/remap/1.2/entity/counterparty/${decoded.id}`,
          type: "counterparty",
          mediaType: "application/json"
        }
      },
      positions: items.map((p: any) => ({
        quantity: p.quantity,
        price: p.price * 100, // копейки!
        assortment: {
          meta: {
            href: `https://api.moysklad.ru/api/remap/1.2/entity/product/${p.productId}`,
            type: "product",
            mediaType: "application/json"
          }
        }
      }))
    };

    const response = await ms.createCustomerOrder(payload);

    return NextResponse.json({ ok: true, order: response }, { status: 200 });

  } catch (e) {
    console.error("ORDER CREATE ERROR:", e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
