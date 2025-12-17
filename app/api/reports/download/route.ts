import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const supplyId = searchParams.get('id'); // ID приемки

  if (!supplyId) return NextResponse.json({ error: "ID не указан" }, { status: 400 });

  try {
    // Запрашиваем стандартную печатную форму "Приходная накладная" или вашу кастомную
    // Сначала получаем список доступных шаблонов для документа supply
    const templates = await msFetch(`/entity/supply/metadata/embeddedtemplate`);
    const templateHref = templates.rows[0].meta.href;

    // Генерируем PDF
    const pdfBuffer = await msFetch(`/entity/supply/${supplyId}/export/`, {
      method: 'POST',
      body: JSON.stringify({
        template: { meta: { href: templateHref, type: "embeddedtemplate" } },
        extension: "pdf"
      }),
      // Важно: msFetch должен уметь возвращать blob/buffer для файлов
    });

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Akt_Priemki_${supplyId}.pdf"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
