// app/api/client/route.ts

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

    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const ms = new MoySkladClient(MOYSKLAD_TOKEN);
    const client = await ms.getCounterparty(payload.id);

    return NextResponse.json({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      inn: client.inn,
      legalAddress: client.legalAddress,
    });
  } catch (err) {
    console.error("CLIENT API ERROR:", err);

    if (err instanceof ApiError) {
      return NextResponse.json({ message: err.message }, { status: err.status });
    }

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
