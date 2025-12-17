import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type'); // supply или purchaseorder

  try {
    // Запрашиваем стандартный шаблон печатной формы
    const templates = await msFetch(`/entity/${type}/metadata/embeddedtemplates`);
    const templateHref = templates.rows[0].meta.href;

    // Генерируем PDF
    const pdf = await msFetch(`/entity/${type}/${id}/export/`, {
      method: 'POST',
      body: JSON.stringify({
        template: { meta: { href: templateHref, type: "embeddedtemplate" } },
        extension: "pdf"
      })
    });

    // МойСклад возвращает PDF в бинарном виде или ссылку. 
    // Если API возвращает JSON с мета-данными файла:
    return NextResponse.redirect(pdf.fileDownloadHref);
  } catch (error: any) {
    return NextResponse.json({ error: "Ошибка генерации файла" }, { status: 500 });
  }
}
