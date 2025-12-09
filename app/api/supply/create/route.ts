import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";
import { verifyJwt } from "@/lib/auth/jwt";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // 🔹 Парсим данные, переданные из клиента
    const productData = JSON.parse(form.get("data")!.toString());
    const imageFile = form.get("image") as File | null;

    const {
      brand, model, color, description,
      sizes, services
    } = productData;

    // ----------------------------------------------------------------
    // 1️⃣ Проверяем токен — находим контрагента клиента
    // ----------------------------------------------------------------
    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split("; ")
      .find(v => v.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = verifyJwt(token);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    const ms = createMoyskladSDK();

    const counterparty = await ms.counterparties.getById(user.id);

    // ----------------------------------------------------------------
    // 2️⃣ Создаём товар (основную карточку)
    // ----------------------------------------------------------------
    const product = await ms.products.create({
      name: `${brand} ${model} ${color}`,
      description,
      attributes: [
        { name: "brand", value: brand },
        { name: "color", value: color }
      ]
    });

    const productId = product.id;

    // ----------------------------------------------------------------
    // 3️⃣ Загружаем фото
    // ----------------------------------------------------------------
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await ms.products.uploadImage(productId, buffer, imageFile.name);
    }

    // ----------------------------------------------------------------
    // 4️⃣ Создаём вариации (size → SKU)
    // ----------------------------------------------------------------
    const variants = [];

    for (const item of sizes) {
      const sku =
        `${brand}-${model}-${color}-${item.size}`
          .replace(/\s+/g, "-")
          .toUpperCase();

      const variant = await ms.products.createVariant(productId, {
        name: `${model} ${item.size}`,
        code: sku,
        barcodes: item.barcode ? [item.barcode] : [],
      });

      variants.push({
        meta: variant.meta,
        quantity: item.quantity
      });
    }

    // ----------------------------------------------------------------
    // 5️⃣ Создаём услугу (works)
    // ----------------------------------------------------------------
    const worksServiceId = process.env.MS_WORKS_ID!;

    const worksDescription =
      services.length > 0
        ? `Услуги: ${services.join(", ")}`
        : "Услуги отсутствуют";

    const worksPosition = {
      assortment: {
        meta: {
          href: `${process.env.MOYSKLAD_API_URL}/entity/service/${worksServiceId}`,
          type: "service",
          mediaType: "application/json"
        }
      },
      quantity: 1,
      description: worksDescription
    };

    // ----------------------------------------------------------------
    // 6️⃣ Формируем позиции поставки
    // ----------------------------------------------------------------
    const positions = [
      ...variants.map(v => ({
        assortment: v.meta,
        quantity: v.quantity
      })),
      worksPosition
    ];

    // ----------------------------------------------------------------
    // 7️⃣ Создаём supply (Поставка)
    // ----------------------------------------------------------------
    const supply = await ms.supply.create({
      organization: process.env.ORGANIZATION_ID!,
      store: process.env.STORE_ID!,
      agent: counterparty.id,
      positions
    });

    return NextResponse.json({
      success: true,
      supplyId: supply.id
    });

  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
