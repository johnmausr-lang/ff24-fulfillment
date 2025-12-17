import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const email = cookies().get('token')?.value;
    if (!email) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    // 1. Получаем ID контрагента по email
    const agentSearch = await msFetch(`/entity/counterparty?filter=email=${email}`);
    if (!agentSearch.rows || agentSearch.rows.length === 0) {
      return NextResponse.json({ items: [] });
    }
    const agentId = agentSearch.rows[0].id;

    // 2. Получаем остатки. 
    // В МойСклад остатки фильтруются по складам, но не по контрагентам.
    // Мы запрашиваем расширенный отчет по остаткам.
    const stockData = await msFetch('/report/stock/all?limit=1000');

    if (!stockData.rows) return NextResponse.json({ items: [] });

    // 3. Форматируем данные для фронтенда
    const formattedItems = stockData.rows.map((row: any) => ({
      id: row.assortmentId,
      name: row.name,
      article: row.code || row.article || "—",
      stock: row.stock,
      reserve: row.reserve,
      inTransit: row.inTransit,
      quantity: row.quantity, // Доступно
      price: row.salePrice / 100 || 0, // Цена в рублях
    }));

    return NextResponse.json({ items: formattedItems });
  } catch (error: any) {
    console.error("⛔ [INVENTORY ERROR]:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
