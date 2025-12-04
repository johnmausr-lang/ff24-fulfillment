import { NextResponse } from "next/server";

const COOKIE_NAME = "ff24_token";

export const POST = async () => {
  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: COOKIE_NAME,
    value: "",
    maxAge: 0,
    path: "/",
  });

  return res;
};
