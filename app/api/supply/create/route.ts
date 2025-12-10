import { NextResponse } from "next/server";
import { createMoyskladSDK } from "@/lib/moysklad/sdk";
import { verifyJwt } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const token = cookie.split("; ").find(x => x.startsWith("auth_token="))?.split("=")[1];

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = verifyJwt(token);
    const payload = await req.json();

    const ms = createMoyskladSDK();
    const counterparty = await ms.counterparties.getById(user.id);

    const supply = await ms.supply.create({
      ...payload,
      agent: { meta: counterparty.meta }
    });

    return NextResponse.json({ success: true, data: supply });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message, code: err.code },
      { status: err.status || 500 }
    );
  }
}
