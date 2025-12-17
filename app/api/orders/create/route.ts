import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Тут ты будешь сохранять заявку или отправлять себе уведомление в Telegram
    console.log("Получена новая заявка на поставку:", body);

    return NextResponse.json({ success: true, message: "Заявка принята" });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
