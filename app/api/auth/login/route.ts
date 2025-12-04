import { NextRequest, NextResponse } from 'next/server';
import { MoySkladClient, ApiError } from '@/lib/ms-client';
import { MOYSKLAD_TOKEN } from '@/lib/config';
import { ClientDataSchema } from '@/lib/models';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        const validation = ClientDataSchema.pick({ phone: true }).safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: 'Неверный формат телефона' }, { status: 400 });
        }

        const phone = normalizePhone(validation.data.phone);

        const ms = new MoySkladClient(MOYSKLAD_TOKEN);
        const client = await ms.findCounterpartyByPhone(phone);

        if (!client) {
            return NextResponse.json({ message: 'Клиент не найден' }, { status: 404 });
        }

        const token = jwt.sign(
            { id: client.id, phone },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        const response = NextResponse.json({ success: true });

        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 дней
        });

        return response;

    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
    }
};
