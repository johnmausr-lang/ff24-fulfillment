import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const inn = searchParams.get("inn");

  const res = await fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${process.env.DADATA_API_KEY}`,
    },
    body: JSON.stringify({ query: inn }),
  });

  const result = await res.json();
  if (result.suggestions && result.suggestions.length > 0) {
    const org = result.suggestions[0];
    return NextResponse.json({
      success: true,
      data: { name: org.value, address: org.data.address.value },
    });
  }

  return NextResponse.json({ success: false });
}
