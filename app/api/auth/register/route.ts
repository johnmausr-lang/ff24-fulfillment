// app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, createToken } from '@/lib/auth';
import { Role } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Пользователь с этим email уже зарегистрирован' }, { status: 409 });
    }

    // 1. Хэшируем пароль и создаем пользователя с ролью CLIENT
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: Role.CLIENT, 
      },
    });

    // 2. Генерируем токен
    const token = createToken(user.id, user.role);

    // 3. Устанавливаем токен в cookie
    const response = NextResponse.json({ message: 'Регистрация успешна', user: { id: user.id, email: user.email, name: user.name } }, { status: 201 });
    response.cookies.set('auth_token', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 60 * 60 * 24 * 7, // 7 дней 
        path: '/' 
    });

    return response;
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
