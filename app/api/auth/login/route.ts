// app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, createToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Неверный email или пароль' }, { status: 401 });
    }

    // 1. Сравниваем хэшированный пароль
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Неверный email или пароль' }, { status: 401 });
    }

    // 2. Генерируем новый токен
    const token = createToken(user.id, user.role);

    // 3. Устанавливаем токен и возвращаем ответ
    const response = NextResponse.json({ message: 'Вход успешен', user: { id: user.id, email: user.email, role: user.role } });
    response.cookies.set('auth_token', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 60 * 60 * 24 * 7, 
        path: '/' 
    });

    return response;
  } catch (error) {
    console.error('Ошибка входа:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
