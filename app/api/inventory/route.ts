import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const email = cookies().get('token')?.value;
    if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 1. Получаем данные о текущем контрагенте
    const agents = await msFetch(`/entity/counterparty?filter=email=${email}`);
    if (!agents.rows || agents.rows.length === 0) return NextResponse.json({ items: [] });
    
    const agentName = agents.rows[0].name; // Например, "ИП Зимин Михаил Юрьевич"

    // 2. Запрашиваем остатки
    // ВАЖНО: МойСклад не умеет фильтровать остатки по контрагенту "из коробки", 
    // если товары не привязаны к проекту или группе.
    const stockData = await msFetch('/report/stock/all?limit=1000');

    // 3. Фильтруем товары. 
    // Пока у нас нет четкой привязки, мы можем фильтровать по "Бренду" (если он указан в коде)
    // Или выводить всё, но помечать, что это общий склад.
    const formattedItems = stockData.rows
      .map((row: any) => ({
        id: row.assortmentId,
        name: row.name,
        brand: row.article?.split('-')[0] || "FF24", // Предполагаем, что артикул начинается с бренда, напр. "ZIMIN-01"
        article: row.code || row.article || "—",
        stock: row.stock,
      }))
      // Если хочешь видеть ТОЛЬКО свои товары, и в МС у твоих товаров артикул начинается, допустим, с "ZIMIN"
      // .filter((item: any) => item.article.includes("ZIMIN")) 

    return NextResponse.json({ items: formattedItems });
  } catch (error: any) {
    console.error("Inventory Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
