import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token')?.value;

    const isAuthPage = req.nextUrl.pathname.startsWith('/login');
    const isProtected = req.nextUrl.pathname.startsWith('/dashboard');

    // Если пользователь НЕ авторизован → пускаем только на /login
    if (!token && isProtected) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Если пользователь УЖЕ авторизован → не пускаем на /login
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/dashboard/:path*']
};
