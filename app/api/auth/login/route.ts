import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';

// Принудительно динамический роут для работы с куками на Render
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email не указан" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    console.log("🔍 [BACKEND] Попытка входа/регистрации для:", cleanEmail);

    // 1. Поиск контрагента в МойСклад
    const filterUrl = `/entity/counterparty?filter=email=${encodeURIComponent(cleanEmail)}`;
    const searchResult = await msFetch(filterUrl);
    
    let client;

    if (!searchResult.rows || searchResult.rows.length === 0) {
      console.log("🆕 [BACKEND] Клиент не найден. Создаем нового...");
      
      // 2. Автоматическое создание нового контрагента, если его нет
      client = await msFetch('/entity/counterparty', {
        method: 'POST',
        body: JSON.stringify({
          name: `Новый клиент (${cleanEmail})`,
          email: cleanEmail,
          description: "Создан автоматически через ЛК FF24",
          // Можно добавить дефолтную группу или тег, если нужно
        })
      });
      console.log("✅ [BACKEND] Новый клиент создан успешно");
    } else {
      client = searchResult.rows[0];
      console.log("👤 [BACKEND] Найден существующий клиент:", client.name);
    }

    // 3. Формируем ответ
    const response = NextResponse.json({ 
      success: true, 
      name: client.name,
      email: cleanEmail 
    });

    // 4. Установка куки для авторизации
    // secure: false — позволяет браузеру сохранить куку даже при мелких неточностях SSL на Render
    // sameSite: 'lax' — стандарт для безопасности и редиректов
    response.cookies.set('token', cleanEmail, { 
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 неделя
    });

    console.log("🍪 [BACKEND] Кука token установлена для:", cleanEmail);

    return response;
  } catch (error: any) {
    console.error("⛔ [BACKEND] Ошибка в процессе авторизации:", error.message);
    return NextResponse.json(
      { error: "Ошибка сервера МойСклад: " + error.message }, 
      { status: 500 }
    );
  }
}
