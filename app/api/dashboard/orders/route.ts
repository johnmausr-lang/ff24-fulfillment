// app/api/dashboard/orders/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { decrypt } from '@/lib/encryption';
import { headers } from 'next/headers';
import { OrderStatus } from '@prisma/client'; // <-- Теперь этот тип будет существовать

// Мок-функция для отправки заказа в Мой Склад
interface OrderItem { msId: string; qty: number; }

async function sendOrderToMoySklad(orderData: any, integrationConfig: any) {
    // Здесь должна быть реальная логика вызова API Мой Склад
    console.log(`Отправка заказа ${orderData.id} в Мой Склад через API...`);
    // ...
    return { success: true, msOrderId: `MS-${Date.now()}` };
}

// Вспомогательная функция для авторизации (использует verifyToken из lib/auth)
// (Предполагаем, что эта функция или middleware передает userId в заголовках)
async function getUserIdFromHeaders() {
    // В реальном приложении: использовать verifyToken и найти пользователя
    const headerList = headers();
    const userId = headerList.get('X-User-Id'); // Если это передается из middleware
    
    if (!userId) {
        return null; // Пользователь не авторизован
    }
    
    return userId;
}


export async function POST(req: Request) {
    const userId = await getUserIdFromHeaders();
    if (!userId) {
        return NextResponse.json({ message: 'Не авторизован' }, { status: 401 });
    }

    try {
        const { orderData, items } = await req.json();

        // 1. Проверка наличия интеграции
        const integrationConfig = await prisma.moySkladIntegration.findUnique({
            where: { userId },
        });

        if (!integrationConfig) {
            return NextResponse.json({ message: 'Интеграция с Мой Склад не настроена.' }, { status: 400 });
        }

        // 2. Логика создания заказа в вашей БД
        const newOrder = await prisma.order.create({
            data: {
                ...orderData,
                userId: userId,
                // Статус по умолчанию: NEW
                status: OrderStatus.NEW, 
            },
        });

        // 3. Отправка заказа в Мой Склад
        const msResult = await sendOrderToMoySklad(newOrder, integrationConfig);

        // 4. Обновление статуса/ID в вашей БД
        if (msResult.success) {
            await prisma.order.update({
                where: { id: newOrder.id },
                data: { 
                    msOrderId: msResult.msOrderId,
                    status: OrderStatus.PACKING // Переводим в сборку
                },
            });
        }

        return NextResponse.json({ 
            message: 'Заказ успешно создан и отправлен в Мой Склад.',
            orderId: newOrder.id,
            msOrderId: msResult.msOrderId,
        }, { status: 201 });

    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}
