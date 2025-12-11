import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";
import { verifyJwt } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split("; ")
      .find((v) => v.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = verifyJwt(token);
    if (!user || typeof user !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    const payload = await req.json();
    const ms = createMoyskladSDK();

    // 1️⃣ Загружаем контрагента
    const counterparty = await ms.counterparties.getById(user.id);

    if (!counterparty) {
      return NextResponse.json(
        { success: false, error: "Counterparty not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Создаём приёмку
    const supply = await ms.supply.create({
      ...payload,
      agent: {
        meta: counterparty.meta, // <-- теперь TS уверен, что counterparty не null
      },
    });

    return NextResponse.json({
      success: true,
      data: supply,
    });

  } catch (err: any) {
    console.error("SUPPLY CREATE ERROR:", err);
    return NextResponse.json(
      { success: false, error: err?.message ?? "Supply error" },
      { status: 500 }
    );
  }
}
