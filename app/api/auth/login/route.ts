import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const MS_API_URL = "https://api.moysklad.ru/api/remap/1.2";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Укажите Email" }, { status: 400 });
    }

    // 1. Поиск контрагента в МойСклад по Email
    const msResponse = await fetch(
      `${MS_API_URL}/entity/counterparty?filter=email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.MOYSKLAD_TOKEN}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 }
      }
    );

    if (!msResponse.ok) {
      return NextResponse.json({ error: "Ошибка связи с МойСклад" }, { status: 500 });
    }

    const msData = await msResponse.json();

    // 2. Проверка существования
    if (!msData.rows || msData.rows.length === 0) {
      return NextResponse.json(
        { error: "Доступ запрещен. Email не найден в базе FF24." },
        { status: 401 }
      );
    }

    const client = msData.rows[0];

    // 3. Генерация JWT токена
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "ff24_secret_key_32_symbols_min");
    const token = await new SignJWT({ 
      ms_id: client.id,
      email: email, 
      name: client.name,
      role: "CLIENT"
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    // 4. Установка защищенной куки
    cookies().set("token", token, {
      httpOnly: true,
      secure: true, // Render использует HTTPS, так что это ок
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 неделя
      path: "/",
    });

    return NextResponse.json({
      success: true,
      name: client.name,
    });

  } catch (error) {
    console.error("Critical Login Error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
