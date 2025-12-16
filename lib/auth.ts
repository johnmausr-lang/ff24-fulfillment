// lib/auth.ts
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { NextResponse } from 'next/server';

// ----------------------------------------------------
// 1. КОНСТАНТЫ И СЕКРЕТЫ
// ----------------------------------------------------

// Секретный ключ должен быть преобразован в Uint8Array
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error('JWT_SECRET environment variable is not set');
}
const secret = new TextEncoder().encode(secretKey);
const tokenExpiration = '7d';

// ----------------------------------------------------
// 2. СОЗДАНИЕ ТОКЕНА
// ----------------------------------------------------

/**
 * Создает подписанный JWT-токен с использованием jose.
 * @param userId ID пользователя
 * @param role Роль пользователя (для авторизации)
 * @returns Строка токена
 */
export async function createToken(userId: string, role: string): Promise<string> {
  const payload = { userId, role };
  
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }) // Указываем алгоритм подписи
    .setIssuedAt() // Время создания
    .setExpirationTime(tokenExpiration) // Срок действия (7 дней)
    .sign(secret);
}


// ----------------------------------------------------
// 3. ВЕРИФИКАЦИЯ И ДЕКОДИРОВАНИЕ
// ----------------------------------------------------

/**
 * Верифицирует токен и возвращает полезную нагрузку.
 * Используется в middleware и защищенных роутах.
 * @param token JWT-токен
 * @returns Полезная нагрузка токена (userId, role)
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    // Токен недействителен или истек
    console.error('JWT verification failed:', error);
    return null;
  }
}
