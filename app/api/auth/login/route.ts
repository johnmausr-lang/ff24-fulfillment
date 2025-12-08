// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { MoySkladClient, ApiError } from "@/lib/ms-client";
import { MOYSKLAD_TOKEN } from "@/lib/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "ff24_token";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("🔵 ТЕЛО ЗАПРОСА НА ВХОД:", body);

    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Укажите корректный email" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    console.log("🔵 Нормализованное email:", normalizedEmail);

    const ms = new MoySkladClient(MOYSKLAD_TOKEN);

    console.log("🔍 Запрос контрагента по email…");

    const counterparty = await ms.findCounterparty(normalizedEmail);

    if (!counterparty) {
      console.log("❌ Контрагент не найден");
      return NextResponse.json(
        { message: "Клиент с таким email не найден." },
        { status: 404 }
      );
    }

    console.log(
      `✅ Найден контрагент: ${counterparty.id} ${counterparty.name}`
    );

    // -------------------------------------------
    // Генерация JWT токена
    // -------------------------------------------
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

    // -------------------------------------------
    // Формируем ответ
    // -------------------------------------------
    const response = NextResponse.json(
      {
        ok: true,
        clientId: counterparty.id,
        name: counterparty.name,
      },
      { status: 200 }
    );

    // -------------------------------------------
    // Устанавливаем cookie (ВАЖНО для Render)
    // -------------------------------------------
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: true, // Обязательно на Render
      sameSite: "none", // Обязательно, иначе cookie НЕ отправляется
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log("✅ Cookie установлена");

    return response;
  } catch (err: any) {
    console.error("❌ ОШИБКА API ВХОДА:", err);

    if (err instanceof ApiError) {
      return NextResponse.json(
        { message: err.message, details: err.details },
        { status: err.status }
      );
    }

    return NextResponse.json(
      { message: "Ошибка сервера", details: err?.message },
      { status: 500 }
    );
  }
}
