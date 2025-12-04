// app/api/profile/route.ts

import { NextRequest, NextResponse } from "next/server";
import { MoySkladClient } from "@/lib/ms-client";
import jwt from "jsonwebtoken";
import { MOYSKLAD_TOKEN } from "@/lib/config";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get("ff24_token");
    if (!cookie)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(cookie.value, JWT_SECRET) as any;

    const ms = new MoySkladClient(MOYSKLAD_TOKEN);

    // ⬇⬇⬇ исправлено
    const profile = await ms.getCounterpartyById(decoded.id);

    return NextResponse.json(
      { ok: true, profile },
      { status: 200 }
    );
  } catch (e) {
    console.error("PROFILE API ERROR:", e);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
