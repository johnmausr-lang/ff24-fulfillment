const MS_TOKEN = process.env.MOYSKLAD_TOKEN; // Твой API токен из настроек МойСклад

export async function msFetch(endpoint: string, options: any = {}) {
  const url = `https://api.moysklad.ru/api/remap/1.2${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${MS_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.error || 'Ошибка МойСклад API');
  }

  return response.json();
}
