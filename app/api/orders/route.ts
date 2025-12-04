// app/api/orders/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MoySkladClient, ApiError } from "@/lib/ms-client";
import { MOYSKLAD_TOKEN } from "@/lib/config";

const COOKIE_NAME = "ff24_token";
const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload: any = jwt.verify(token, JWT_SECRET);

    const ms = new MoySkladClient(MOYSKLAD_TOKEN);

    const url = `${ms["apiUrl"]}/entity/customerorder?filter=agent=${payload.id}`;
    const data = await ms["http"].get(url);

    const orders =
      data.rows?.map((o: any) => ({
        id: o.id,
        name: o.name,
        date: o.created,
        status: o.state?.name ?? "Без статуса",
        positionsCount: o.positions?.meta?.size ?? 0,
      })) ?? [];

    return NextResponse.json(orders);
  } catch (err) {
    console.error("ORDERS API ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
