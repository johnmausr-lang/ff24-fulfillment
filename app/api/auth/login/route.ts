// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma'; // <-- ИСПРАВЛЕНИЕ: Используется именованный импорт { prisma }
import { createToken } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email и пароль обязательны' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            // Включаем role для создания токена
            select: {
                id: true,
                email: true,
                password: true,
                role: true,
                name: true,
                createdAt: true,
            }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ message: 'Неверный email или пароль' }, { status: 401 });
        }

        // 2. Генерируем новый токен
        const token = createToken(user.id, user.role);

        // 3. Устанавливаем токен и возвращаем ответ
        const response = NextResponse.json({ 
            message: 'Вход успешен', 
            user: { 
                id: user.id, 
                email: user.email, 
                role: user.role 
            } 
        });

        // Устанавливаем cookie с токеном
        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 неделя
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}
