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

    const body = {
      organization: { 
        meta: { 
          href: `${MS_API_URL}/entity/organization/${process.env.ORGANIZATION_ID}`, 
          type: "organization", 
          mediaType: "application/json" 
        } 
      },
      agent: { 
        meta: { 
          href: `${MS_API_URL}/entity/counterparty/${ms_id}`, 
          type: "counterparty", 
          mediaType: "application/json" 
        } 
      },
      store: {
        meta: {
          href: `${MS_API_URL}/entity/store/${process.env.STORE_ID}`,
          type: "store",
          mediaType: "application/json"
        }
      },
      description: comment || "Заказ создан через ЛК FF24",
      positions: items.map((item: any) => ({
        quantity: parseFloat(item.quantity),
        price: 0,
        assortment: { meta: item.meta }
      }))
    };

    const res = await fetch(`${MS_API_URL}/entity/supply`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MOYSKLAD_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error(errData);
      throw new Error("Ошибка МС");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Не удалось создать поставку" }, { status: 500 });
  }
}
