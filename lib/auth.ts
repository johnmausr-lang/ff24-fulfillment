// lib/auth.ts

import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { ApiError } from './ms-client';

// Секрет для JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// Интерфейс данных внутри токена
export interface TokenPayload {
    id: string;
    phone: string;
}

// -------------------------------------------
// ✅ Генерация JWT токена (исправление ошибки импорта)
// -------------------------------------------
export function generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '7d', // токен действует 7 дней
    });
}

// -------------------------------------------
// 🔍 Проверка токена из заголовка Authorization
// -------------------------------------------
export const verifyToken = (req: NextRequest): TokenPayload => {
    const authHeader = req.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError('Отсутствует токен авторизации', 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;

        if (!payload.id) {
            throw new ApiError('Недействительный токен (отсутствует ID клиента)', 401);
        }

        return payload;
    } catch (error) {
        console.error('JWT Verification Error:', error);
        throw new ApiError('Недействительный или истекший токен', 401);
    }
};

// -------------------------------------------
// 🔒 Обёртка для защиты API-маршрутов
// -------------------------------------------
export const withAuth = (
    handler: (req: NextRequest, payload: TokenPayload) => Promise<Response>
) => {
    return async (req: NextRequest) => {
        try {
            const payload = verifyToken(req); // проверяем токен
            return handler(req, payload);     // вызываем защищённый обработчик
        } catch (error) {
            if (error instanceof ApiError) {
                return new Response(
                    JSON.stringify({ message: error.message }),
                    { status: error.status, headers: { 'Content-Type': 'application/json' } }
                );
            }

            return new Response(
                JSON.stringify({ message: 'Внутренняя ошибка сервера' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }
    };
};
