// app/api/profile/route.ts

export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth/jwt";

export async function GET(req: Request) {
  try {
    // Получаем куки
    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader
      .split("; ")
      .find((v) => v.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Проверяем JWT
    const user = verifyJwt(token);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Server error",
      },
      { status: 500 }
    );
  }
}
