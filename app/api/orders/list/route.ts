import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const email = cookies().get('token')?.value;
    if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 1. Находим контрагента
    const agentSearch = await msFetch(`/entity/counterparty?filter=email=${email}`);
    if (!agentSearch.rows || agentSearch.rows.length === 0) return NextResponse.json({ orders: [] });
    const agentId = agentSearch.rows[0].id;

    // 2. Получаем заказы этого агента с расширением (expand) для получения имен статусов
    const ordersData = await msFetch(`/entity/purchaseorder?filter=agent=https://api.moysklad.ru/api/remap/1.2/entity/counterparty/${agentId}&expand=state`);

    const orders = ordersData.rows.map((order: any) => ({
      id: order.id,
      name: order.name,
      date: order.moment,
      sum: order.sum / 100,
      status: order.state?.name || "Новый",
      statusColor: order.state?.color || "#888888",
      description: order.description || ""
    }));

    return NextResponse.json({ orders });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
