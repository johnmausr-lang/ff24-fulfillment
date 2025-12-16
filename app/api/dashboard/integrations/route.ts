// app/api/dashboard/integrations/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encrypt } from '@/lib/encryption';
import { headers } from 'next/headers';

// Мок-функция для проверки API-ключа Мой Склад
async function testMoySkladConnection(apiKey: string) {
  // 💡 В реальном проекте здесь будет fetch к API Мой Склад
  // для проверки, валидны ли креды. Сейчас просто симулируем успех.
  return { success: true, message: "Connection successful" }; 
}

export async function POST(req: Request) {
  const headerList = headers();
  // Получаем ID пользователя, который был установлен в middleware
  const userId = headerList.get('X-User-Id'); 
  
  if (!userId) {
    return NextResponse.json({ error: 'Необходимо авторизоваться.' }, { status: 401 });
  }

  try {
    const { integrationType, key, companyName } = await req.json();

    if (!integrationType || !key) {
      return NextResponse.json({ error: 'Тип интеграции и ключ обязательны' }, { status: 400 });
    }

    // 1. Проверка ключа (симуляция)
    const testResult = await testMoySkladConnection(key);
    if (!testResult.success) {
      return NextResponse.json({ error: 'Тест интеграции не пройден', details: testResult.message }, { status: 400 });
    }

    // 2. ✅ Шифрование перед сохранением
    const encryptedKey = encrypt(key);
    
    // 3. Сохранение/обновление зашифрованного ключа
    const integration = await prisma.integration.upsert({
      where: { 
        userId_type: { userId, type: integrationType } 
      } as any, 
      update: { 
        apiKey: encryptedKey, 
        isEnabled: true,
        companyName: companyName || null,
        lastSync: new Date(),
      },
      create: { 
        userId, 
        type: integrationType, 
        apiKey: encryptedKey, 
        isEnabled: true,
        companyName: companyName || null,
        lastSync: new Date(),
      },
    });

    return NextResponse.json({ message: 'Интеграция успешно сохранена и активирована.', integration }, { status: 200 });

  } catch (error) {
    console.error('Ошибка интеграции:', error);
    return NextResponse.json({ error: 'Ошибка сервера при сохранении ключа или шифровании.' }, { status: 500 });
  }
}

// GET-маршрут для получения статусов интеграций
export async function GET() {
  const headerList = headers();
  const userId = headerList.get('X-User-Id');
  
  if (!userId) {
    return NextResponse.json({ error: 'Необходимо авторизоваться.' }, { status: 401 });
  }

  try {
    // Получаем список интеграций, НЕ запрашивая apiKey
    const integrations = await prisma.integration.findMany({
      where: { userId },
      select: { type: true, isEnabled: true, companyName: true, lastSync: true, createdAt: true, },
    });
    return NextResponse.json(integrations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка сервера при получении данных.' }, { status: 500 });
  }
}
