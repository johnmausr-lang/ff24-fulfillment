import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';

export const dynamic = 'force-dynamic'; // Убирает ошибку сборки Render

export async function POST(request: Request) {
  try {
    const { email } = await request.json(); // Теперь ждем email
    const cleanEmail = email.toLowerCase().trim();

    // Поиск контрагента в МойСклад по email
    const counterparty = await msFetch(`/entity/counterparty?filter=email=${cleanEmail}`);

    if (!counterparty.rows || counterparty.rows.length === 0) {
      return NextResponse.json(
        { error: "Клиент с такой почтой не найден в системе МойСклад" }, 
        { status: 404 }
      );
    }

    const client = counterparty.rows[0];
    
    const response = NextResponse.json({ 
      success: true, 
      name: client.name,
      email: cleanEmail 
    });

    // Устанавливаем токен (используем email как идентификатор)
    response.cookies.set('token', cleanEmail, { 
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 дней
    });

    return response;
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
