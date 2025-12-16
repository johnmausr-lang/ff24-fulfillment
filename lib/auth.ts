// lib/auth.ts
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Role } from '@prisma/client'; // Предполагаем, что Role будет экспортирована после миграции

// ⚠️ Убедитесь, что вы установили переменную окружения JWT_SECRET!
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_fallback_key_for_development_only';
const SALT_ROUNDS = 10; // Стандартное количество раундов для bcrypt

// 1. Хэширование пароля
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// 2. Сравнение пароля
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Создает JWT-токен с данными пользователя и ролью
 * @param userId ID пользователя
 * @param userRole Роль пользователя (CLIENT | ADMIN)
 * @returns JWT-токен
 */
export function createToken(userId: string, userRole: Role): string {
  return jwt.sign(
    { userId, role: userRole }, 
    JWT_SECRET, 
    { expiresIn: '7d' } // Токен действителен 7 дней
  );
}

/**
 * Верифицирует токен и возвращает данные
 * @param token JWT-токен
 * @returns { userId: string, role: Role } | null
 */
export function verifyToken(token: string): { userId: string, role: Role } | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string, role: Role, iat: number, exp: number };
    return { userId: payload.userId, role: payload.role };
  } catch (error) {
    // Ошибка верификации (истек, неверная подпись и т.д.)
    return null;
  }
}
