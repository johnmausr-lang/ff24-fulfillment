import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const MS_API_URL = "https://api.moysklad.ru/api/remap/1.2";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email обязателен" }, { status: 400 });
    }

    // 1. Ищем контрагента в МойСклад по Email
    const msResponse = await fetch(
      `${MS_API_URL}/entity/counterparty?filter=email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.MOYSKLAD_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!msResponse.ok) {
      throw new Error("Ошибка запроса к МойСклад");
    }

    const msData = await msResponse.json();

    // 2. Проверяем, найден ли клиент
    if (!msData.rows || msData.rows.length === 0) {
      return NextResponse.json(
        { error: "Клиент с таким Email не зарегистрирован в системе FF24" },
        { status: 401 }
      );
    }

    const client = msData.rows[0];

    // 3. Создаем JWT токен (авторизация на 7 дней)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");
    const token = await new SignJWT({ 
      id: client.id, 
      email: email, 
      name: client.name,
      role: "CLIENT" 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    // 4. Устанавливаем куку
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 дней
      path: "/",
    });

    return NextResponse.json({
      success: true,
      name: client.name,
    });

  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
