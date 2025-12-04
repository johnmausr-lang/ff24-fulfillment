import { MOYSKLAD_TOKEN } from '@/lib/config';
import { MoySkladClient } from '@/lib/ms-client';
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';

const handler = async (req: NextRequest, payload: { id: string, phone: string }) => {
    const msClient = new MoySkladClient(MOYSKLAD_TOKEN);

    // 1. Получение остатков со склада
    const inventory = await msClient.checkInventory();

    // 2. Приведение к формату фронтенда
    const formattedInventory = inventory.map((item: any) => ({
        productName: item.name,
        code: item.code || '—',
        stock: item.stock,
        inTransit: item.reserve || 0,
    }));

    return NextResponse.json(formattedInventory, { status: 200 });
};

export const GET = withAuth(handler as any);
