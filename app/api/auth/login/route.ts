import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    // Санитизация как в вашей модели Python: оставляем только цифры
    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: "Неверный формат номера" }, { status: 400 });
    }

    // Здесь можно добавить проверку: существует ли такой клиент в БД
    
    const response = NextResponse.json({ 
      success: true, 
      phone: cleanPhone 
    });

    // Устанавливаем куку сессии на 7 дней
    response.cookies.set('ff24_session', cleanPhone, {
      httpOnly: true, // Защита от XSS
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
