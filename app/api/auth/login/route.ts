// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { MoySkladClient, ApiError } from '@/lib/ms-client';
import { MOYSKLAD_TOKEN } from '@/lib/config';
import { ClientDataSchema } from '@/lib/models';
import { generateToken } from '@/lib/auth';

// Нормализация телефона: оставляем только цифры
const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { phone } = body;

        // 1. Валидация телефона (Zod)
        const validation = ClientDataSchema.pick({ phone: true }).safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: 'Неверный формат телефона. Ожидается: +79XXXXXXXXX' },
                { status: 400 }
            );
        }

        const validatedPhone = validation.data.phone;
        const normalized = normalizePhone(validatedPhone);

        // 2. Поиск клиента в МойСклад
        const msClient = new MoySkladClient(MOYSKLAD_TOKEN);
        const counterparty = await msClient.findCounterpartyByPhone(normalized);

        if (!counterparty) {
            return NextResponse.json(
                { message: 'Клиент с таким номером телефона не найден в базе.' },
                { status: 404 }
            );
        }

        // 3. Генерация JWT токена
        const token = generateToken({
            id: counterparty.id,
            phone: validatedPhone,
        });

        return NextResponse.json(
            {
                token,
                clientId: counterparty.id,
                clientName: counterparty.name,
                clientPhone: validatedPhone
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Login API Error:', error);
        
        if (error instanceof ApiError) {
            return NextResponse.json(
                { message: `Ошибка МойСклад: ${error.message}` },
                { status: error.status }
            );
        }

        return NextResponse.json(
            { message: 'Внутренняя ошибка сервера.' },
            { status: 500 }
        );
    }
};
