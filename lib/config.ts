// lib/config.ts

// Используем NEXT_PUBLIC_ префикс для переменных, которые можно читать на фронтенде
// Для API-токенов используем обычные переменные окружения (только на бэкенде)

export const MS_API_URL = process.env.MOYSKLAD_API_URL || 'https://api.moysklad.ru/api/remap/1.2';
export const MOYSKLAD_TOKEN = process.env.MOYSKLAD_TOKEN as string; // ТОЛЬКО ДЛЯ БЭКЕНДА
export const DADATA_API_KEY = process.env.DADATA_API_KEY as string; // ТОЛЬКО ДЛЯ БЭКЕНДА

// ID Настроек МойСклад (нужны для создания документов)
export const ORGANIZATION_ID = process.env.ORGANIZATION_ID as string;
export const STORE_ID = process.env.STORE_ID as string;
export const PDF_TEMPLATE_ID = process.env.PDF_TEMPLATE_ID as string;

// ID Кастомных Атрибутов (из config.py)
export const MS_BRAND_ID = process.env.MS_BRAND_ID as string;
export const MS_SIZE_ID = process.env.MS_SIZE_ID as string;
export const MS_COLOR_ID = process.env.MS_COLOR_ID as string;

// Проверка наличия обязательных токенов (запускать при старте сервера)
if (!MOYSKLAD_TOKEN || !DADATA_API_KEY) {
    console.error("КРИТИЧЕСКАЯ ОШИБКА: MOYSKLAD_TOKEN или DADATA_API_KEY не заданы в переменных окружения!");
}
