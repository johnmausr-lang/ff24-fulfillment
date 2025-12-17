import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const phone = cookies().get('token')?.value;
    if (!phone) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 1. Находим ID контрагента
    const agents = await msFetch(`/entity/counterparty?filter=phone~${phone}`);
    if (agents.rows.length === 0) return NextResponse.json({ reports: [] });
    const agentId = agents.rows[0].id;

    // 2. Ищем завершенные приемки (Supply) для этого клиента
    // Фильтр по контрагенту
    const supplies = await msFetch(`/entity/supply?filter=agent=https://api.moysklad.ru/api/remap/1.2/entity/counterparty/${agentId}`);

    const formattedReports = supplies.rows.map((doc: any) => ({
      id: doc.id,
      name: `Акт приемки №${doc.name}`,
      date: doc.moment.split(' ')[0],
      sum: doc.sum / 100, // Сумма поставки
      downloadUrl: `/api/reports/download?id=${doc.id}&type=supply`
    }));

    return NextResponse.json({ reports: formattedReports });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
