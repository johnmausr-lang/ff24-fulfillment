// app/api/dashboard/orders/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { decrypt } from '@/lib/encryption';
import { headers } from 'next/headers';
import { OrderStatus } from '@prisma/client';

// Мок-функция для отправки заказа в Мой Склад
interface OrderItem { msId: string; qty: number; }

async function sendOrderToMoySklad(apiKey: string, orderItems: OrderItem[], targetMarketplace: string) {
    // 💡 В реальном проекте здесь будет логика формирования JSON и fetch к API Мой Склад
    console.log(`Simulating order creation in MS for ${orderItems.length} items...`);
    
    // Имитация успешного создания заказа в МС
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    return { success: true, msOrderId: `MS-ORDER-${Date.now().toString().slice(-6)}`, message: 'Заказ успешно создан.' };
}

export async function POST(req: Request) {
    const headerList = headers();
    const userId = headerList.get('X-User-Id');
    
    if (!userId) {
        return NextResponse.json({ error: 'Необходимо авторизоваться.' }, { status: 401 });
    }

    try {
        const { orderItems, targetMarketplace, note } = await req.json();

        if (!orderItems || orderItems.length === 0 || !targetMarketplace) {
            return NextResponse.json({ error: 'Заказ пуст или не указан маркетплейс.' }, { status: 400 });
        }

        // 1. Получение и дешифрование ключа МС
        const msIntegration = await prisma.integration.findFirst({
            where: { userId, type: 'MoySklad', isEnabled: true },
        });

        if (!msIntegration || !msIntegration.apiKey) {
            return NextResponse.json({ error: 'Интеграция с Мой Склад не настроена.' }, { status: 404 });
        }

        const decryptedKey = decrypt(msIntegration.apiKey);
        
        // 2. Создание заказа в локальной БД (Статус DRAFT/PENDING_MS)
        const localOrder = await prisma.clientOrder.create({
            data: {
                userId,
                status: OrderStatus.PENDING_MS, // Ожидает подтверждения от МС
                items: orderItems, // Сохраняем состав заказа
                targetMarketplace,
                note: note || null,
            } as any, // ⚠️ В реальном проекте OrderItem должен быть корректно описан в схеме Prisma.
        });

        // 3. Отправка заказа в Мой Склад
        const msResult = await sendOrderToMoySklad(decryptedKey, orderItems, targetMarketplace);

        // 4. Обновление статуса в локальной БД
        if (msResult.success) {
            await prisma.clientOrder.update({
                where: { id: localOrder.id },
                data: {
                    status: OrderStatus.IN_PROCESS, // Заказ в обработке
                    msId: msResult.msOrderId,
                },
            });
            return NextResponse.json({ 
                message: 'Заказ успешно передан в обработку.', 
                orderId: localOrder.id,
                msId: msResult.msOrderId,
            }, { status: 200 });
        } else {
            // Если МС вернул ошибку, заказ остается в DRAFT или переводится в FAILED
            await prisma.clientOrder.update({
                where: { id: localOrder.id },
                data: { status: OrderStatus.DRAFT },
            });
            return NextResponse.json({ 
                error: `Ошибка Мой Склад: ${msResult.message}`,
                orderId: localOrder.id,
            }, { status: 400 });
        }

    } catch (error) {
        console.error('Ошибка создания заказа:', error);
        return NextResponse.json({ error: 'Внутренняя ошибка сервера.' }, { status: 500 });
    }
}
