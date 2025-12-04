import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MoySkladClient } from "@/lib/ms-client";
import { MOYSKLAD_TOKEN } from "@/lib/config";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "ff24_token";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get(COOKIE_NAME);
    if (!cookie)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(cookie.value, JWT_SECRET) as any;
    const clientId = decoded.id;

    const ms = new MoySkladClient(MOYSKLAD_TOKEN);

    const url =
      `${ms["apiUrl"]}/entity/supply` +
      `?filter=agent=${clientId}&limit=50`;

    const data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${MOYSKLAD_TOKEN}`,
        Accept: "application/json;charset=utf-8",
      },
    }).then((r) => r.json());

    return NextResponse.json(
      { ok: true, items: data.rows || [] },
      { status: 200 }
    );
  } catch (e) {
    console.error("ORDERS LIST ERROR:", e);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
