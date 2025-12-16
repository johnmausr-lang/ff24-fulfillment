// app/api/profile/route.ts (Предполагаемый исправленный код)
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth'; // <-- ИСПРАВЛЕНИЕ: Импорт из lib/auth, а не из lib/auth/jwt.ts

export async function GET(req: Request) {
    // 1. Извлекаем токен из Cookie
    const token = req.headers.get('cookie')?.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

    if (!token) {
        return NextResponse.json({ message: 'Не авторизован' }, { status: 401 });
    }

    // 2. Верифицируем токен с помощью JOSE
    const payload = await verifyToken(token); // <-- Используем функцию из lib/auth.ts (JOSE)

    if (!payload || !payload.userId) {
        return NextResponse.json({ message: 'Недействительный токен' }, { status: 401 });
    }

    try {
        // 3. Получаем данные пользователя
        const user = await prisma.user.findUnique({
            where: { id: payload.userId as string },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
        }

        // 4. Возвращаем профиль
        return NextResponse.json({ user });

    } catch (error) {
        console.error('Profile fetch error:', error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}
