// app/api/inventory/list/route.ts (Исправленная версия)

import { MOYSKLAD_TOKEN } from '@/lib/config';
import { MoySkladClient } from '@/lib/ms-client';
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth'; // <-- Используем защитник маршрута

// Используем паттерн withAuth для автоматической проверки токена
const handler = async (req: NextRequest, payload: { counterpartyId: string }) => {
    // ID клиента теперь берется из полезной нагрузки токена
    const counterpartyId = payload.id; 
    
    const msClient = new MoySkladClient(MOYSKLAD_TOKEN);

    // 1. Получение данных из МойСклад
    const inventory = await msClient.checkInventory(counterpartyId);
    
    // 2. Форматирование данных для фронтенда
    const formattedInventory = inventory.map((item: any) => ({
        productName: item.name,
        code: item.code || '—',
        stock: item.stock, 
        inTransit: item.reserve || 0,
    }));

    return NextResponse.json(formattedInventory, { status: 200 });
};

// Экспортируем защищенный обработчик
export const GET = withAuth(handler as any);
