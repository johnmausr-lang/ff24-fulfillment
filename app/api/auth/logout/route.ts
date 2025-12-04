import { NextResponse } from 'next/server';

export const POST = async () => {
    const res = NextResponse.json({ success: true });

    res.cookies.set('auth_token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
    });

    return res;
};
