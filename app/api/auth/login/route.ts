// app/api/auth/login/route.ts

import { MOYSKLAD_TOKEN } from '@/lib/config';
import { MoySkladClient, ApiError } from '@/lib/ms-client';
import { ClientDataSchema } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; 

// Секретный ключ, должен быть задан в .env или Vercel
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key'; 

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    
    // 1. Валидация данных (теперь строго типизирована через Zod)
    const validation = ClientDataSchema.pick({ phone: true, email: true }).safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ message: 'Неверный формат данных: требуется телефон или email.' }, { status: 400 });
    }
    const { phone, email } = validation.data;
    
    // Вход по телефону или email
    const loginValue = phone || email; 

    const msClient = new MoySkladClient(MOYSKLAD_TOKEN);

    // 2. Поиск контрагента в МойСклад
    const counterparty = await msClient.findCounterparty(loginValue);

    if (!counterparty) {
      return NextResponse.json({ message: 'Клиент не найден в базе МойСклад.' }, { status: 404 });
    }
    
    // 3. Выдача JWT-токена
    const token = jwt.sign(
        { id: counterparty.id, phone: loginValue }, 
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
