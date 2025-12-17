/**
 * Универсальный модуль для работы с API МойСклад
 * Поддерживает JSON и скачивание файлов (PDF/Images)
 */

export async function msFetch(endpoint: string, options: any = {}) {
  // Формируем полный URL
  const baseUrl = 'https://api.moysklad.ru/api/remap/1.2';
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

  // Настройка заголовков
  const headers = {
    'Authorization': `Bearer ${process.env.MOYSKLAD_TOKEN}`,
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip', // Оптимизация скорости
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Обработка ошибок API
    if (!response.ok) {
      const errorData = await response.text();
      console.error(`❌ [MS API ERROR] ${response.status}:`, errorData);
      throw new Error(`MoySklad Error: ${response.status} - ${errorData}`);
    }

    // ЛОГИКА СКАЧИВАНИЯ ФАЙЛОВ:
    // Если в URL есть '/export/' или это запрос на файл, возвращаем Buffer
    const isExport = url.includes('/export/') || url.includes('/files/');
    
    if (isExport) {
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }

    // В остальных случаях возвращаем стандартный JSON
    return await response.json();
  } catch (error: any) {
    console.error("🔥 [FETCH CRITICAL ERROR]:", error.message);
    throw error;
  }
}
