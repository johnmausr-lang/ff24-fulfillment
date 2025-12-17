import { NextResponse } from "next/server";

const MS_API_URL = "https://api.moysklad.ru/api/remap/1.2";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, inn, name, phone, address } = body;

    // Создаем контрагента в МойСклад
    const msResponse = await fetch(`${MS_API_URL}/entity/counterparty`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MOYSKLAD_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name || email,
        email: email,
        inn: inn,
        phone: phone,
        actualAddress: address,
        description: "Регистрация из ЛК Фулфилмента",
      }),
    });

    if (!msResponse.ok) {
      const errorData = await msResponse.json();
      return NextResponse.json({ error: "Ошибка МойСклад", details: errorData }, { status: 400 });
    }

    const newClient = await msResponse.json();
    return NextResponse.json({ success: true, id: newClient.id });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
