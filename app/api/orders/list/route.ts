import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MoySkladClient, ApiError } from "@/lib/ms-client";
import { MOYSKLAD_TOKEN } from "@/lib/config";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "ff24_token";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get(COOKIE_NAME);

    if (!cookie) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(cookie.value, JWT_SECRET) as {
      id: string;
      email: string;
    };

    const clientId = decoded.id;

    const ms = new MoySkladClient(MOYSKLAD_TOKEN);

    console.log("📦 ЗАПРОС СПИСКА ЗАКАЗОВ КЛИЕНТА:", clientId);

    const orders = await ms.getCustomerOrders(clientId);

    return NextResponse.json(
      { ok: true, orders },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("❌ ORDER LIST API ERROR:", e);

    if (e instanceof ApiError) {
      return NextResponse.json(
        { message: e.message, details: e.details },
        { status: e.status }
      );
    }

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
