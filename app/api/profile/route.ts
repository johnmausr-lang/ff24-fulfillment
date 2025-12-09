// app/api/profile/route.ts

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth/jwt";

export async function GET() {
  try {
    const token = cookies().get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = verifyJwt(token);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message ?? "Server error",
      },
      { status: 500 }
    );
  }
}
