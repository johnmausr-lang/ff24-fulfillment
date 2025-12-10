import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth/jwt";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") ?? "";
    const token = cookie
      .split("; ")
      .find((v) => v.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = verifyJwt(token);

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message ?? "Profile error" },
      { status: 500 }
    );
  }
}
