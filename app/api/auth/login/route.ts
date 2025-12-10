import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";
import { signJwt } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ success: false });

    const ms = createMoyskladSDK();
    const user = await ms.counterparties.findByEmail(email);

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" });
    }

    const token = signJwt({ id: user.id, email });

    const res = NextResponse.json({ success: true });

    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: err.status || 500 }
    );
  }
}
