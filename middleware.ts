import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token')?.value;

    const isLogin = req.nextUrl.pathname.startsWith('/login');
    const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');

    // Неавторизованный — блокируем dashboard
    if (!token && isDashboard) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Авторизованный — блокируем /login
    if (token && isLogin) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

// Middleware будет работать только здесь:
export const config = {
    matcher: ['/login', '/dashboard/:path*'],
};
