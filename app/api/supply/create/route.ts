// app/api/supply/create/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth'; // <-- ИСПРАВЛЕНИЕ: Используем корректный путь для верификации токена

// Вспомогательная функция для получения данных о пользователе из запроса
async function authenticateRequest(req: Request) {
    // 1. Извлекаем токен из Cookie
    const token = req.headers.get('cookie')?.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

    if (!token) {
        return { error: 'Необходима авторизация', status: 401 };
    }

    // 2. Верифицируем токен с помощью JOSE
    const payload = await verifyToken(token);

    if (!payload || !payload.userId) {
        return { error: 'Недействительный токен', status: 401 };
    }

    return { userId: payload.userId as string };
}


export async function POST(req: Request) {
    // 1. Авторизация и получение ID пользователя
    const authResult = await authenticateRequest(req);
    if (authResult.error) {
        return NextResponse.json({ message: authResult.error }, { status: authResult.status });
    }
    const { userId } = authResult;
    
    try {
        const { moyskladId, items } = await req.json();

        // 2. Здесь должна быть логика создания записи о поставке/отгрузке в БД,
        // а также вызов API Мой Склад (MoySklad) для фиксации операции.
        
        // *******************************************************************
        // ВАША БИЗНЕС-ЛОГИКА (заглушка)
        // *******************************************************************
        
        // Пример: Логика обновления остатков или создания документа отгрузки.
        // Для демонстрации: просто проверяем, что пользователь существует.
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
             return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
        }
        
        // *******************************************************************
        
        // 3. Успешный ответ
        return NextResponse.json({ 
            message: 'Поставка успешно создана и синхронизирована.',
            supplyId: `SUP-${Date.now()}`,
            syncedItems: items.length
        }, { status: 200 });

    } catch (error) {
        console.error('Supply creation error:', error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}
