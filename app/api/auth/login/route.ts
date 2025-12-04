// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { MoySkladClient, ApiError } from "@/lib/ms-client";
import { MOYSKLAD_TOKEN } from "@/lib/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "ff24_token";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Укажите корректный email" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const ms = new MoySkladClient(MOYSKLAD_TOKEN);
    const counterparty = await ms.findCounterparty(normalizedEmail);

    if (!counterparty) {
      return NextResponse.json(
        { message: "Клиент с таким email не найден в МойСклад." },
        { status: 404 }
      );
    }

    const token = jwt.sign(
      {
        id: counterparty.id,
        email: normalizedEmail,
        name: counterparty.name,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json(
      {
        ok: true,
        clientId: counterparty.id,
        name: counterparty.name,
      },
      { status: 200 }
    );

    res.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error(err);
    if (err instanceof ApiError) {
      return NextResponse.json({ message: err.message }, { status: err.status });
    }

    return NextResponse.json(
      { message: "Ошибка сервера" },
      { status: 500 }
    );
  }
};
