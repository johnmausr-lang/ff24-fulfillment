import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const email = cookies().get('token')?.value;
    if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const agents = await msFetch(`/entity/counterparty?filter=email=${email}`);
    if (!agents.rows || agents.rows.length === 0) return NextResponse.json({ reports: [] });
    
    const agentId = agents.rows[0].id;

    // Ищем документы Приемки
    const supplies = await msFetch(`/entity/supply?filter=agent=https://api.moysklad.ru/api/remap/1.2/entity/counterparty/${agentId}`);

    return NextResponse.json({
      reports: supplies.rows.map((doc: any) => ({
        id: doc.id,
        name: `Акт приемки №${doc.name}`,
        date: doc.moment.split(' ')[0],
        sum: doc.sum / 100,
        downloadUrl: `/api/reports/download?id=${doc.id}&type=supply`
      }))
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
