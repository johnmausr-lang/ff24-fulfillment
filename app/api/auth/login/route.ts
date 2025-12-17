import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();
    const cleanPhone = phone.replace(/\D/g, "");

    // Ищем контрагента в МойСклад по телефону
    // Фильтр: находим тех, у кого телефон совпадает (учитываем разные форматы записи)
    const counterparty = await msFetch(`/entity/counterparty?filter=phone~${cleanPhone}`);

    if (counterparty.rows.length === 0) {
      return NextResponse.json({ error: "Клиент с таким номером не найден в системе" }, { status: 404 });
    }

    const client = counterparty.rows[0];
    const response = NextResponse.json({ 
      success: true, 
      name: client.name,
      phone: cleanPhone 
    });

    // Устанавливаем токен (телефон) в куки для Middleware
    response.cookies.set('token', cleanPhone, { 
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
