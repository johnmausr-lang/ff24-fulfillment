import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const supplyId = searchParams.get('id');

  if (!supplyId) return NextResponse.json({ error: "ID документа не указан" }, { status: 400 });

  try {
    // 1. Получаем список стандартных шаблонов для Приемки (supply)
    const templates = await msFetch(`/entity/supply/metadata/embeddedtemplate`);
    // Берем первый доступный шаблон (обычно это "Приходная накладная")
    const templateHref = templates.rows[0].meta.href;

    // 2. Делаем запрос на экспорт документа в PDF
    const pdfBuffer = await msFetch(`/entity/supply/${supplyId}/export/`, {
      method: 'POST',
      body: JSON.stringify({
        template: {
          meta: {
            href: templateHref,
            type: "embeddedtemplate",
            mediaType: "application/json"
          }
        },
        extension: "pdf"
      })
    });

    // 3. Возвращаем файл в браузер
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Akt_Priemki_FF24_${supplyId}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF Export Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
