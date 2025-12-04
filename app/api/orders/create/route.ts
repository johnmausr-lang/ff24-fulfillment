import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MoySkladClient, ApiError } from "@/lib/ms-client";
import { MOYSKLAD_TOKEN } from "@/lib/config";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "ff24_token";

export async function POST(req: NextRequest) {
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

    const body = await req.json();

    console.log("📦 ПОЛУЧЕН ЗАКАЗ:", JSON.stringify(body, null, 2));

    const ms = new MoySkladClient(MOYSKLAD_TOKEN);

    // Вызов МойСклад API
    const result = await ms.createCustomerOrder(clientId, {
      positions: body.positions,
      comment: body.comment,
    });

    console.log("🟢 СОЗДАН ЗАКАЗ:", result);

    return NextResponse.json({ ok: true, order: result }, { status: 200 });
  } catch (e: any) {
    console.error("❌ ORDER CREATE API ERROR:", e);

    if (e instanceof ApiError) {
      return NextResponse.json(
        { message: e.message, details: e.details },
        { status: e.status }
      );
    }

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
