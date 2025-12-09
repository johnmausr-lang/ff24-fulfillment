import { NextResponse } from "next/server";
import { MoyskladClient } from "@/lib/moysklad/client";
import { signJwt } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ success: false });

  const client = new MoyskladClient(process.env.MOYSKLAD_TOKEN!);
  const found = await client.findCounterpartyByEmail(email);

  const user = found?.rows?.[0];
  if (!user) {
    return NextResponse.json({ success: false });
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
}
