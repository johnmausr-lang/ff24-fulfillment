export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth/jwt";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";

export async function GET(req: Request) {
  try {
    // -----------------------------
    // 1) Читаем куку auth_token
    // -----------------------------
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

    // -----------------------------
    // 2) Декодируем JWT
    // -----------------------------
    const payload = verifyJwt(token);

    if (!payload || typeof payload === "string") {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    // payload = { id, email }

    // -----------------------------
    // 3) Получаем данные контрагента
    // -----------------------------
    const ms = createMoyskladSDK();

    const counterparty = await ms.counterparties.getById(payload.id);

    if (!counterparty) {
      return NextResponse.json(
        { success: false, error: "User not found in MoySklad" },
        { status: 404 }
      );
    }

    // -----------------------------
    // 4) Отдаём профиль
    // -----------------------------
    return NextResponse.json({
      success: true,
      user: {
        id: counterparty.id,
        name: counterparty.name,
        email: counterparty.email ?? payload.email,
        phone: counterparty.phone ?? null,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Server error",
      },
      { status: 500 }
    );
  }
}
