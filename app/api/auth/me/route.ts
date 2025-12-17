import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers';

export async function GET() {
  const email = cookies().get('token')?.value;
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const agentSearch = await msFetch(`/entity/counterparty?filter=email=${email}`);
  const agent = agentSearch.rows[0];

  return NextResponse.json({
    name: agent.name,
    email: agent.email,
    phone: agent.phone || "Не указан",
    legalAddress: agent.legalAddress || "Не указан",
    inn: agent.inn || "Не указан",
    description: agent.description || ""
  });
}
