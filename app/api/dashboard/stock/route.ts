import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const MS_API_URL = "https://api.moysklad.ru/api/remap/1.2";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

    // 1. Расшифровываем токен, чтобы получить ms_id клиента
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const client_id = payload.ms_id as string;

    // 2. Запрашиваем остатки по конкретному контрагенту
    // Используем отчет stock/all с фильтром по владельцу/контрагенту
    // В МойСклад остатки обычно смотрятся по складам, но мы отфильтруем товары, 
    // которые принадлежат данному контрагенту.
    const res = await fetch(
      `${MS_API_URL}/report/stock/all?filter=counterparty=${MS_API_URL}/entity/counterparty/${client_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MOYSKLAD_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    // Форматируем данные для фронтенда
    const stocks = (data.rows || []).map((row: any) => ({
      name: row.name,
      code: row.code || row.article || "—",
      quantity: row.stock, // Текущий остаток
      price: row.price / 100 || 0
    }));

    return NextResponse.json({ stocks });

  } catch (error) {
    console.error("Dashboard Stock Error:", error);
    return NextResponse.json({ error: "Ошибка загрузки данных" }, { status: 500 });
  }
}
