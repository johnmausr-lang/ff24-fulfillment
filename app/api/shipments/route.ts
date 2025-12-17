import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers'; // Добавлен обязательный импорт

export async function GET() {
  try {
    const cookieStore = cookies(); // Инициализируем хранилище кук
    const phone = cookieStore.get('token')?.value;

    if (!phone) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    // 1. Находим ID контрагента по телефону
    const agentData = await msFetch(`/entity/counterparty?filter=phone~${phone}`);
    
    if (!agentData.rows || agentData.rows.length === 0) {
      return NextResponse.json({ orders: [] });
    }
    
    const agentId = agentData.rows[0].id;

    // 2. Тянем заказы именно этого агента (Заказы поставщикам)
    const orders = await msFetch(`/entity/purchaseorder?filter=agent=https://api.moysklad.ru/api/remap/1.2/entity/counterparty/${agentId}`);
    
    if (!orders.rows) {
      return NextResponse.json({ orders: [] });
    }

    return NextResponse.json({
      orders: orders.rows.map((o: any) => ({
        id: o.name,
        status: o.state?.name || "Новый", // Берем имя статуса из объекта state
        date: o.moment.split(' ')[0],
        items: o.positions?.meta?.size || 0 // Количество позиций в заказе
      }))
    });
  } catch (error: any) {
    console.error("Shipments API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
