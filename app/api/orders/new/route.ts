import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MoySkladClient } from "@/lib/ms-client";
import { MOYSKLAD_TOKEN } from "@/lib/config";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "ff24_token";

export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get(COOKIE_NAME);
    if (!cookie)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(cookie.value, JWT_SECRET) as any;
    const clientId = decoded.id;

    const body = await req.json();

    console.log("🔵 NEW SUPPLY REQUEST BODY:", body);

    if (!body.positions || !Array.isArray(body.positions)) {
      return NextResponse.json(
        { message: "Неверные позиции заказа" },
        { status: 400 }
      );
    }

    const ms = new MoySkladClient(MOYSKLAD_TOKEN);

    const result = await ms.createSupply(clientId, body);

    console.log("🟢 SUPPLY CREATED:", result);

    return NextResponse.json(
      { ok: true, supply: result },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("❌ SUPPLY API ERROR:", e);
    return NextResponse.json(
      { message: e.message || "Server error", details: e.details },
      { status: e.status || 500 }
    );
  }
}
