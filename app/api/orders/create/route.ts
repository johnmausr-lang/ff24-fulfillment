import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const MS_API_URL = "https://api.moysklad.ru/api/remap/1.2";

export async function POST(req: Request) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const ms_id = payload.ms_id as string;

    const { items, comment } = await req.json();

    // Формируем заказ для МойСклад
    const orderBody = {
      organization: { meta: { href: `${MS_API_URL}/entity/organization/${process.env.ORGANIZATION_ID}`, type: "organization", mediaType: "application/json" } },
      agent: { meta: { href: `${MS_API_URL}/entity/counterparty/${ms_id}`, type: "counterparty", mediaType: "application/json" } },
      description: comment || "Заказ создан через Личный Кабинет FF24",
      positions: items.map((item: any) => ({
        quantity: item.quantity,
        price: 0, // Цену можно подтягивать из справочника, если нужно
        assortment: { meta: item.meta }
      }))
    };

    const res = await fetch(`${MS_API_URL}/entity/customerorder`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MOYSKLAD_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderBody),
    });

    if (!res.ok) throw new Error("Ошибка создания в МС");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Сбой при создании заказа" }, { status: 500 });
  }
}
