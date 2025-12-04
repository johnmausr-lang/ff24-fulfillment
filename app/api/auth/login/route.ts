// app/api/auth/login/route.ts

import { MOYSKLAD_TOKEN } from '@/lib/config';
import { MoySkladClient, ApiError } from '@/lib/ms-client';
import { ClientDataSchema } from '@/lib/models';
// Предполагаем, что вы используете 'jsonwebtoken' для выдачи токенов
import jwt from 'jsonwebtoken'; 
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key'; // Секретный ключ!

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    
    // 1. Валидация данных (теперь строго типизирована через Zod)
    const validation = ClientDataSchema.pick({ phone: true, email: true }).safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ message: 'Неверный формат данных' }, { status: 400 });
    }
    const { phone, email } = validation.data;
    
    const msClient = new MoySkladClient(MOYSKLAD_TOKEN);

    // 2. Поиск контрагента в МойСклад (логика из find_counterparty)
    const counterparty = await msClient.findCounterparty(phone, email);

    if (!counterparty) {
      return NextResponse.json({ message: 'Клиент не найден в базе МойСклад.' }, { status: 404 });
    }
    
    // В реальном проекте: здесь должна быть проверка пароля (которого нет в МС).
    // Так как МС не хранит пароли, обычно используется отдельная БД/СУБД
    // или логин по коду (как в боте). Для упрощения сейчас считаем, что 
    // если клиент найден, он авторизован.
    
    // 3. Выдача JWT-токена
    const token = jwt.sign(
        { id: counterparty.id, phone: phone }, 
        JWT_SECRET, 
        { expiresIn: '7d' }
    );

    return NextResponse.json({ 
        token, 
        counterpartyId: counterparty.id,
        name: counterparty.name 
    }, { status: 200 });

  } catch (e) {
    if (e instanceof ApiError) {
        return NextResponse.json({ message: e.message }, { status: e.status });
    }
    console.error('Login error:', e);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
};
