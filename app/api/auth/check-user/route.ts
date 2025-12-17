import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const inn = searchParams.get("inn");

  let filter = "";
  if (email) filter = `email=${encodeURIComponent(email)}`;
  if (inn) filter = `inn=${encodeURIComponent(inn)}`;

  const res = await fetch(
    `https://api.moysklad.ru/api/remap/1.2/entity/counterparty?filter=${filter}`,
    {
      headers: { Authorization: `Bearer ${process.env.MOYSKLAD_TOKEN}` },
    }
  );

  const data = await res.json();
  return NextResponse.json({ exists: data.rows && data.rows.length > 0 });
}
