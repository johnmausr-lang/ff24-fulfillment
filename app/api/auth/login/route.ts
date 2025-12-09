// app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import { MoyskladClient } from "@/lib/moysklad/client";
import { CounterpartyService } from "@/lib/moysklad/counterparty";
import { signJwt } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email required" },
        { status: 400 }
      );
    }

    const client = new MoyskladClient(process.env.MOYSKLAD_TOKEN!);
    const counterparty = new CounterpartyService(client);

    const user = await counterparty.findByEmail(email);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found in MoySklad" },
        { status: 404 }
      );
    }

    const token = signJwt({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    const res = NextResponse.json({ success: true, user });

    res.cookies.set("auth_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 дней
      sameSite: "lax",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
