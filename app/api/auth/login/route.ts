// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    // Запрос к МойСклад (аналог find_counterparty из вашего python файла)
    const msResponse = await fetch(
      `https://api.moysklad.ru/api/remap/1.2/entity/counterparty?filter=email=${email}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.MOYSKLAD_TOKEN}`,
          'Accept-Encoding': 'gzip',
        }
      }
    );

    const data = await msResponse.json();

    if (data.rows && data.rows.length > 0) {
      // Пользователь найден. Тут создаем сессию (JWT)
      return NextResponse.json({ success: true, user: data.rows[0].name });
    } else {
      return NextResponse.json({ error: 'Пользователь с таким Email не найден' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
