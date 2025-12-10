import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";
import { signJwt } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ success: false, error: "Email required" }, { status: 400 });
    }

    const ms = createMoyskladSDK();

    // поиск контрагента по email
    const found = await ms.counterparties.findByEmail(email);
    const user = found?.rows?.[0];

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const token = signJwt({
      id: user.id,
      email,
      iat: Math.floor(Date.now() / 1000),
    });

    const res = NextResponse.json({ success: true });

    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;

  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message ?? "Login error" },
      { status: 500 }
    );
  }
}
