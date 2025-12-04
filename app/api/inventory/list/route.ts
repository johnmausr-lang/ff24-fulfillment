// app/api/inventory/list/route.ts

import { MOYSKLAD_TOKEN } from '@/lib/config';
import { MoySkladClient, ApiError } from '@/lib/ms-client';
import { NextResponse, NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth'; // Нужен вспомогательный файл для проверки токена

// Вспомогательный класс для авторизации (нужно создать lib/auth.ts)
// Здесь только мок для демонстрации:
export const verifyToken = (req: NextRequest) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError('Отсутствует токен авторизации', 401);
    }
    // В реальном коде: проверить токен через jwt.verify
    const token = authHeader.split(' ')[1];
    return { counterpartyId: 'client_id_from_token' }; // Возвращаем ID клиента
};
// --- КОНЕЦ МОКА ---


export const GET = async (req: NextRequest) => {
  try {
    // 1. Проверка авторизации и получение ID клиента
    const { counterpartyId } = verifyToken(req); 
    
    const msClient = new MoySkladClient(MOYSKLAD_TOKEN);

    // 2. Получение данных из МойСклад
    const inventory = await msClient.checkInventory(counterpartyId);
    
    // 3. Форматирование данных для фронтенда
    const formattedInventory = inventory.map((item: any) => ({
        productName: item.name,
        code: item.code || '—',
        stock: item.stock, // Общее количество
        inTransit: item.reserve || 0, // В резерве
    }));

    return NextResponse.json(formattedInventory, { status: 200 });

  } catch (e) {
    if (e instanceof ApiError) {
        return NextResponse.json({ message: e.message }, { status: e.status });
    }
    console.error('Inventory error:', e);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
};
