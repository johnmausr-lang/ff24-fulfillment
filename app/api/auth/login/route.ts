// lib/auth.ts

import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { ApiError } from './ms-client';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key'; 

// Интерфейс для данных, хранящихся в токене
interface TokenPayload {
    id: string; 
    phone: string;
}

// Проверяет токен из заголовка Authorization
export const verifyToken = (req: NextRequest): TokenPayload => {
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError('Отсутствует токен авторизации', 401);
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
        // Проверяем, что ID клиента присутствует
        if (!payload.id) {
             throw new ApiError('Недействительный токен (отсутствует ID клиента)', 401);
        }
        return payload;
    } catch (error) {
        console.error('JWT Verification Error:', error);
        throw new ApiError('Недействительный или истекший токен', 401);
    }
};

// Защищает API-маршрут (паттерн middleware)
export const withAuth = (handler: (req: NextRequest, payload: TokenPayload) => Promise<Response>) => {
    return async (req: NextRequest) => {
        try {
            const payload = verifyToken(req);
            return handler(req, payload);
        } catch (error) {
            if (error instanceof ApiError) {
                return new Response(JSON.stringify({ message: error.message }), { status: error.status, headers: { 'Content-Type': 'application/json' } });
            }
            return new Response(JSON.stringify({ message: 'Внутренняя ошибка сервера' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
    };
};
