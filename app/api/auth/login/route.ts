import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log("🔍 [BACKEND] Запрос на логин. Email:", email);

    if (!email) {
      console.error("❌ [BACKEND] Email не передан в теле запроса");
      return NextResponse.json({ error: "Email обязателен" }, { status: 400 });
    }

    // Формируем URL фильтрации
    const filterUrl = `/entity/counterparty?filter=email=${encodeURIComponent(email)}`;
    console.log("🌐 [BACKEND] Запрос к МойСклад:", filterUrl);

    const counterparty = await msFetch(filterUrl);
    
    // Логируем структуру ответа для отладки
    console.log("📊 [BACKEND] МС вернул записей:", counterparty.rows?.length || 0);

    if (!counterparty.rows || counterparty.rows.length === 0) {
      console.warn("⚠️ [BACKEND] Контрагент с таким email не найден в МС:", email);
      return NextResponse.json(
        { error: "Пользователь с таким Email не зарегистрирован в системе МойСклад" }, 
        { status: 404 }
      );
    }

    const client = counterparty.rows[0];
    console.log("✅ [BACKEND] Клиент успешно найден:", client.name, "(ID:", client.id, ")");
    
    const response = NextResponse.json({ 
      success: true, 
      name: client.name,
      email: email 
    });

    // Установка куки
    console.log("🍪 [BACKEND] Установка куки token...");
    response.cookies.set('token', email, { 
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 неделя
    });

    return response;
  } catch (error: any) {
    console.error("⛔ [BACKEND] КРИТИЧЕСКАЯ ОШИБКА API:", error.message);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера. Подробности в логах Render." }, 
      { status: 500 }
    );
  }
}
