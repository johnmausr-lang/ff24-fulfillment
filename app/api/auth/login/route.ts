// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { MoySkladClient, ApiError } from "@/lib/ms-client";
import { MOYSKLAD_TOKEN } from "@/lib/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "ff24_token";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("🔵 LOGIN REQUEST BODY:", body);

    const { email } = body;

    if (!email || typeof email !== "string") {
      console.error("❌ Email отсутствует или неверного формата");
      return NextResponse.json(
        { message: "Укажите корректный email" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    console.log("🔵 Normalized email:", normalizedEmail);

    // Принудительно НЕ даём Next.js ломать Accept
    const ms = new MoySkladClient(MOYSKLAD_TOKEN);

    console.log("🔵 Запрос в МойСклад: поиск контрагента…");

    const counterparty = await ms.findCounterparty(normalizedEmail);

    console.log("🔵 Ответ МойСклад:", counterparty);

    if (!counterparty) {
      console.warn("⚠ Контрагент не найден:", normalizedEmail);
      return NextResponse.json(
        { message: "Клиент с таким email не найден в МойСклад." },
        { status: 404 }
      );
    }

    console.log("✅ Найден контрагент:", counterparty.id, counterparty.name);

    const token = jwt.sign(
      {
        id: counterparty.id,
        email: normalizedEmail,
        name: counterparty.name,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("🔵 JWT создан");

    const res = NextResponse.json(
      {
        ok: true,
        clientId: counterparty.id,
        name: counterparty.name,
      },
      { status: 200 }
    );

    res.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log("✅ Cookie установлена");

    return res;
  } catch (err: any) {
    console.error("❌ LOGIN API ERROR:", err);

    if (err instanceof ApiError) {
      console.error("❌ ApiError details:", err.details);
      return NextResponse.json(
        { message: err.message, details: err.details },
        { status: err.status }
      );
    }

    return NextResponse.json(
      { message: "Ошибка сервера", error: String(err) },
      { status: 500 }
    );
  }
};
