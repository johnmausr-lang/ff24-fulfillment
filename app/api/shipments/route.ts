import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const email = cookies().get('token')?.value;
    if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const agents = await msFetch(`/entity/counterparty?filter=email=${email}`);
    if (!agents.rows || agents.rows.length === 0) return NextResponse.json({ orders: [] });
    
    const agentId = agents.rows[0].id;

    const orders = await msFetch(`/entity/purchaseorder?filter=agent=https://api.moysklad.ru/api/remap/1.2/entity/counterparty/${agentId}`);
    
    return NextResponse.json({
      orders: orders.rows.map((o: any) => ({
        id: o.name,
        status: o.state?.name || "Новый",
        date: o.moment.split(' ')[0],
        items: o.positions?.meta?.size || 0
      }))
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
