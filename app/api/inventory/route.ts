import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const email = cookies().get('token')?.value;
    if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const agents = await msFetch(`/entity/counterparty?filter=email=${email}`);
    if (!agents.rows || agents.rows.length === 0) return NextResponse.json({ items: [] });
    
    const agentId = agents.rows[0].id;
    const stockData = await msFetch('/report/stock/all?limit=100'); // Можно добавить фильтр по остаткам, если в МС настроено разделение

    const formattedItems = stockData.rows.map((row: any) => ({
      id: row.assortmentId,
      name: row.name,
      brand: row.code?.split('-')[0] || "FF24",
      article: row.code || "Нет SKU",
      stock: row.stock,
    }));

    return NextResponse.json({ items: formattedItems });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
