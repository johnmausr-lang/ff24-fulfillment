import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth/jwt";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";

export async function POST(req: Request) {
  try {
    // ----------------------------------------------------------------
    // 1️⃣ Проверяем токен авторизации
    // ----------------------------------------------------------------
    const cookie = req.headers.get("cookie") ?? "";
    const token = cookie
      .split("; ")
      .find((v) => v.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = verifyJwt(token);

    // ----------------------------------------------------------------
    // 2️⃣ Получаем данные запроса
    // ----------------------------------------------------------------
    const body = await req.json();
    const { products, comment } = body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { success: false, error: "No products provided" },
        { status: 400 }
      );
    }

    // ----------------------------------------------------------------
    // 3️⃣ Инициализация SDK
    // ----------------------------------------------------------------
    const ms = createMoyskladSDK();

    // ----------------------------------------------------------------
    // 4️⃣ Загружаем контрагента (продавца) по ID
    // ----------------------------------------------------------------
    const counterparty = await ms.counterparties.getById(user.id);

    if (!counterparty) {
      return NextResponse.json(
        { success: false, error: "Counterparty not found" },
        { status: 404 }
      );
    }

    // ----------------------------------------------------------------
    // 5️⃣ Создаём документ «Приёмка» (Supply)
    // ----------------------------------------------------------------
    const supply = await ms.supply.create({
      agent: { meta: counterparty.meta },
      description: comment || "",
      positions: products.map((p: any) => ({
        assortment: { meta: p.meta },
        quantity: p.qty ?? 1,
      })),
    });

    // ----------------------------------------------------------------
    // 6️⃣ Возвращаем результат
    // ----------------------------------------------------------------
    return NextResponse.json({
      success: true,
      data: supply,
    });

  } catch (err: any) {
    console.error("SUPPLY CREATE ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Supply creation failed",
      },
      { status: 500 }
    );
  }
}
