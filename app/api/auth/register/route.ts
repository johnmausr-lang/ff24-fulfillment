// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { createToken } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email и пароль обязательны' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ message: 'Пользователь с таким email уже существует' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                // Роль по умолчанию устанавливается в схеме Prisma (@default(USER))
                // Если нужна другая логика, ее можно добавить здесь
            },
        });

        // 2. Генерируем токен
        const token = createToken(newUser.id, newUser.role); // Используем newUser.role (полученное из БД)

        // 3. Устанавливаем токен и возвращаем ответ
        const response = NextResponse.json({ 
            message: 'Регистрация успешна', 
            user: { id: newUser.id, email: newUser.email, role: newUser.role } 
        });

        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}
