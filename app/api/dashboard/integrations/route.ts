// app/api/dashboard/integrations/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth'; // Используем логику JWT (JOSE)

// ----------------------------------------------------
// Вспомогательная функция для авторизации
// ----------------------------------------------------

async function authenticateRequest(req: Request) {
    const token = req.headers.get('cookie')?.split('; ').find(row => row.startsWith('auth_token='))?.split('=')[1];

    if (!token) {
        return { error: 'Необходима авторизация', status: 401 };
    }

    const payload = await verifyToken(token);

    if (!payload || !payload.userId) {
        return { error: 'Недействительный токен', status: 401 };
    }

    return { userId: payload.userId as string };
}

// ----------------------------------------------------
// GET: Получение статуса интеграции
// ----------------------------------------------------

export async function GET(req: Request) {
    const authResult = await authenticateRequest(req);
    if (authResult.error) {
        return NextResponse.json({ message: authResult.error }, { status: authResult.status });
    }
    const { userId } = authResult;

    try {
        const integration = await prisma.moySkladIntegration.findUnique({
            where: { userId },
            // Не возвращаем зашифрованные логин/пароль!
            select: {
                id: true,
                organizationId: true,
                storeId: true,
                priceTypeHref: true,
                msBrandId: true,
                createdAt: true,
            }
        });

        if (!integration) {
            return NextResponse.json({ 
                status: 'inactive', 
                message: 'Интеграция с Мой Склад не настроена.' 
            }, { status: 200 });
        }

        return NextResponse.json({ 
            status: 'active', 
            config: integration 
        }, { status: 200 });

    } catch (error) {
        console.error('Integration fetch error:', error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера при получении интеграции' }, { status: 500 });
    }
}


// ----------------------------------------------------
// POST: Сохранение/Обновление интеграции
// ----------------------------------------------------

export async function POST(req: Request) {
    const authResult = await authenticateRequest(req);
    if (authResult.error) {
        return NextResponse.json({ message: authResult.error }, { status: authResult.status });
    }
    const { userId } = authResult;
    
    try {
        // Деструктурируем обязательные и необязательные поля
        const { 
            msLogin, 
            msPassword, 
            organizationId, 
            storeId, 
            priceTypeHref,
            ...optionalFields 
        } = await req.json();

        if (!msLogin || !msPassword || !organizationId || !storeId) {
            return NextResponse.json({ message: 'Обязательные поля Мой Склад не заполнены' }, { status: 400 });
        }

        // 2. Шифрование учетных данных (ЗАГЛУШКА)
        // В реальном приложении здесь должна быть функция шифрования
        const encryptedLogin = `ENCRYPTED_${msLogin}`;
        const encryptedPassword = `ENCRYPTED_${msPassword}`; 

        // 3. Сохранение/обновление зашифрованного ключа
        // ИСПРАВЛЕНИЕ: Используем правильное имя модели 'moySkladIntegration'
        const data = {
            msLogin: encryptedLogin,
            msPassword: encryptedPassword,
            organizationId,
            storeId,
            priceTypeHref,
            // Распространяем необязательные ID характеристик (msBrandId, msColorId и т.д.)
            ...optionalFields,
        };
        
        const integration = await prisma.moySkladIntegration.upsert({ 
            where: { 
                userId: userId // Уникальная связь по userId
            },
            update: data,
            create: {
                userId,
                ...data, // Включаем все поля для создания
            }
        });

        return NextResponse.json({ 
            message: 'Интеграция успешно сохранена.', 
            integrationId: integration.id 
        }, { status: 200 });

    } catch (error) {
        console.error('Integration save error:', error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера при сохранении интеграции' }, { status: 500 });
    }
}
