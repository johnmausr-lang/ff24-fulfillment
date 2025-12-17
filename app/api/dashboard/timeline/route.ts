import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const email = cookies().get('token')?.value;
    const agentSearch = await msFetch(`/entity/counterparty?filter=email=${email}`);
    const agentId = agentSearch.rows[0].id;

    // Тянем заказы и приемки одновременно
    const [orders, supplies] = await Promise.all([
      msFetch(`/entity/purchaseorder?filter=agent=https://api.moysklad.ru/api/remap/1.2/entity/counterparty/${agentId}&expand=state`),
      msFetch(`/entity/supply?filter=agent=https://api.moysklad.ru/api/remap/1.2/entity/counterparty/${agentId}`)
    ]);

    // Объединяем их в одну ленту событий
    const timeline = [
      ...orders.rows.map((o: any) => ({
        id: o.id,
        type: 'order',
        name: `Заявка №${o.name}`,
        date: o.moment,
        status: o.state?.name || "Новый",
        sum: o.sum / 100,
        raw: o
      })),
      ...supplies.rows.map((s: any) => ({
        id: s.id,
        type: 'supply',
        name: `Приемка №${s.name}`,
        date: s.moment,
        status: "На складе",
        sum: s.sum / 100,
        raw: s
      }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ timeline });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
