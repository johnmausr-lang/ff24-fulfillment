import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const MS_API_URL = "https://api.moysklad.ru/api/remap/1.2";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const ms_id = payload.ms_id as string;

    // Запрос остатков. В МойСклад фильтрация по контрагенту в остатках 
    // работает через привязку товаров к владельцу или через фильтр в отчете.
    const res = await fetch(
      `${MS_API_URL}/report/stock/all?filter=counterparty=${MS_API_URL}/entity/counterparty/${ms_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MOYSKLAD_TOKEN}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 } // Кэшируем на 1 минуту для скорости
      }
    );

    if (!res.ok) throw new Error("MoySklad API Error");

    const data = await res.json();

    // Преобразуем формат МоегоСклада в плоский список для фронта
    const stocks = (data.rows || []).map((item: any) => ({
      name: item.name,
      code: item.article || item.code || "N/A",
      quantity: Math.max(0, item.stock || 0),
      price: (item.price / 100) || 0
    }));

    return NextResponse.json({ stocks });

  } catch (error: any) {
    console.error("Stock API Error:", error);
    return NextResponse.json({ error: "Ошибка сервера МойСклад" }, { status: 500 });
  }
}
