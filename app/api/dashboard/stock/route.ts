import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const MS_API_URL = "https://api.moysklad.ru/api/remap/1.2";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Извлекаем данные из токена
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "ff24_default_secret_32_chars");
    const { payload } = await jwtVerify(token, secret);
    const ms_id = payload.ms_id as string;

    // 2. Запрашиваем остатки из отчета "Сток по всем товарам"
    // Фильтруем по конкретному контрагенту (агенту)
    const msResponse = await fetch(
      `${MS_API_URL}/report/stock/all?filter=counterparty=${MS_API_URL}/entity/counterparty/${ms_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.MOYSKLAD_TOKEN}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 } // Кэшируем на 1 минуту
      }
    );

    if (!msResponse.ok) {
      throw new Error("MoySklad API Error");
    }

    const data = await msResponse.json();

    // 3. Форматируем ответ для фронтенда
    const stocks = (data.rows || []).map((row: any) => ({
      name: row.name,
      code: row.article || row.code || "—",
      quantity: row.stock || 0,
      price: row.price / 100 || 0,
    }));

    return NextResponse.json({ stocks });

  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Не удалось получить данные из МойСклад" },
      { status: 500 }
    );
  }
}
