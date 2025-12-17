import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const phone = cookies().get('token')?.value;
    if (!phone) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 1. Ищем контрагента, чтобы получить его данные
    const agents = await msFetch(`/entity/counterparty?filter=phone~${phone}`);
    if (agents.rows.length === 0) {
      return NextResponse.json({ items: [] });
    }
    const agent = agents.rows[0];

    // 2. Получаем расширенный отчет об остатках
    // Мы запрашиваем остатки (stock), артикул (code) и имя
    const stockData = await msFetch('/report/stock/all?limit=100');

    // 3. Фильтрация и форматирование
    // Примечание: В идеале в МойСклад товары должны быть помечены атрибутом клиента.
    // Если у тебя товары не привязаны к агенту в МС, мы выведем весь доступный сток.
    const formattedItems = stockData.rows.map((row: any) => ({
      id: row.assortmentId,
      name: row.name,
      brand: row.article ? row.article.split('-')[0] : "FF24", // Пример парсинга бренда из артикула
      article: row.code || "Нет SKU",
      stock: row.stock,
      price: row.price / 100, // МС хранит цены в копейках
    }));

    return NextResponse.json({ items: formattedItems });

  } catch (error: any) {
    console.error("Inventory Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
