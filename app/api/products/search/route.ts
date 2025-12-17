import { NextResponse } from "next/server";

const MS_API_URL = "https://api.moysklad.ru/api/remap/1.2";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("search") || "";

    if (query.length < 2) return NextResponse.json({ products: [] });

    const res = await fetch(
      `${MS_API_URL}/entity/product?search=${encodeURIComponent(query)}&limit=15`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MOYSKLAD_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    const products = (data.rows || []).map((p: any) => ({
      id: p.id,
      name: p.name,
      article: p.article || p.code || "—",
      meta: p.meta
    }));

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка поиска" }, { status: 500 });
  }
}
