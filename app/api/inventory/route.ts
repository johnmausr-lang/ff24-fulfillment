import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers';

export async function GET() {
  const phone = cookies().get('token')?.value;

  try {
    // 1. Получаем ID контрагента по телефону
    const agentData = await msFetch(`/entity/counterparty?filter=phone~${phone}`);
    if (agentData.rows.length === 0) return NextResponse.json({ items: [] });
    
    const agentId = agentData.rows[0].id;

    // 2. Запрашиваем остатки в разрезе этого контрагента
    // В МойСклад остатки обычно фильтруются по складам или доп. полям.
    // Если ты хранишь товар раздельно, мы добавим нужный фильтр.
    const stock = await msFetch(`/report/stock/all?filter=counterparty=https://api.moysklad.ru/api/remap/1.2/entity/counterparty/${agentId}`);

    const formattedItems = stock.rows.map((row: any) => ({
      id: row.assortmentId,
      name: row.name,
      article: row.code,
      stock: row.stock,
      brand: "МойСклад", // Можно вытянуть из доп. полей товара
    }));

    return NextResponse.json({ items: formattedItems });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
