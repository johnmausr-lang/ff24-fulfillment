import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const cleanEmail = email.toLowerCase().trim();

    // 1. Ищем клиента
    let counterparty = await msFetch(`/entity/counterparty?filter=email=${cleanEmail}`);
    let client;

    if (!counterparty.rows || counterparty.rows.length === 0) {
      console.log("🆕 Создаем нового клиента:", cleanEmail);
      // 2. Если нет — создаем нового сразу
      client = await msFetch('/entity/counterparty', {
        method: 'POST',
        body: JSON.stringify({
          name: `Новый клиент (${cleanEmail})`,
          email: cleanEmail,
          description: "Создан автоматически при первом входе в ЛК"
        })
      });
    } else {
      client = counterparty.rows[0];
    }

    const response = NextResponse.json({ 
      success: true, 
      name: client.name,
      email: cleanEmail 
    });

    // 3. Устанавливаем куку
    response.cookies.set('token', cleanEmail, { 
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
