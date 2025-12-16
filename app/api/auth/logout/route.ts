// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Выход успешен' });
  
  // 1. Удаляем токен из cookies, устанавливая пустую строку и истекший срок
  response.cookies.set('auth_token', '', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 0, // Немедленное истечение
      path: '/' 
  });

  return response;
}
