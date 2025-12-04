// lib/ms-client.ts

import { MS_API_URL, ORGANIZATION_ID, MS_BRAND_ID, MS_SIZE_ID, MS_COLOR_ID, PDF_TEMPLATE_ID, STORE_ID } from './config';
import { ClientData, OrderData, OrderPositionData } from './models';

// --- Вспомогательные типы и классы ---

export class ApiError extends Error {
  constructor(message: string, public status: number = 500) {
    super(message);
    this.name = 'ApiError';
  }
}

// Упрощенный клиент для HTTP-запросов
class MsHttpClient {
  private headers: Record<string, string>;
  
  constructor(private token: string) {
    this.headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }
  
  // Вспомогательный метод для выполнения запроса и обработки ошибок
  private async request(url: string, options: RequestInit = {}): Promise<any> {
    const res = await fetch(url, {
      ...options,
      headers: { ...this.headers, ...options.headers },
    });
    
    if (res.status === 204) return null; // No Content
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Ошибка MS ${res.status}: ${errorText}`);
      throw new ApiError(`Ошибка при обращении к МойСклад: ${res.status}`, res.status);
    }
    
    // Попытка парсинга JSON, если тело не пустое
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return res.json();
    }
    // Если не JSON, возвращаем null или текст
    return null;
  }
  
  // Упрощенные методы
  post(url: string, body: any, options?: RequestInit): Promise<any> {
    return this.request(url, { method: 'POST', body: JSON.stringify(body), ...options });
  }

  get(url: string, options?: RequestInit): Promise<any> {
    return this.request(url, { method: 'GET', ...options });
  }
  
  // PUT и DELETE опущены для краткости
}

// --- MoySklad Client ---

export class MoySkladClient {
  private apiUrl = MS_API_URL;
  private http: MsHttpClient;

  constructor(token: string) {
    this.http = new MsHttpClient(token);
  }

  // Получение контрагента по ID
  async getCounterparty(id: string): Promise<any> {
    const url = `${this.apiUrl}/entity/counterparty/${id}`;
    return this.http.get(url);
  }

  // Создание/обновление контрагента
  async createCounterparty(client: ClientData): Promise<any> {
    // В реальном коде: сначала findCounterpartyByPhone. Если нет, то create.
    
    const url = `${this.apiUrl}/entity/counterparty`;
    const body = {
      // Имя: ИП Иванов И.И. (телефон)
      name: client.full_name,
      phone: client.phone,
      email: client.email,
      inn: client.inn,
      legalAddress: client.address,
      // ... другие поля
      companyType: client.org_type === 'LEGAL' ? 'legal' : 'individual'
    };
    
    return this.http.post(url, body);
  }
  
  // Создание заявки на поставку
  async createSupply(clientId: string, order: OrderData): Promise<any> {
    const clientMeta = {
        meta: {
            href: `${this.apiUrl}/entity/counterparty/${clientId}`,
            type: 'counterparty',
            mediaType: 'application/json'
        }
    };
    
    const orgMeta = {
        meta: {
            href: `${this.apiUrl}/entity/organization/${ORGANIZATION_ID}`,
            type: 'organization',
            mediaType: 'application/json'
        }
    };
    
    const storeMeta = {
        meta: {
            href: `${this.apiUrl}/entity/store/${STORE_ID}`,
            type: 'store',
            mediaType: 'application/json'
        }
    };
    
    // 1. Создание позиций заказа
    const positions = await Promise.all(order.positions.map(async pos => {
        const product = await this.createProduct(pos);
        return {
            quantity: pos.quantity,
            price: 100, // Заглушка, можно брать из прайс-листа
            assortment: {
                meta: product.meta
            }
        };
    }));
    
    // 2. Создание заявки на поставку
    const url = `${this.apiUrl}/entity/supply`;
    
    // !!! ИСПРАВЛЕНИЕ ОШИБКИ BRAND !!!
    // Берем бренд из первой позиции, т.к. в OrderData его нет.
    const brandValue = order.positions[0]?.brand || 'Не указан'; 

    const body = {
        agent: clientMeta,
        organization: orgMeta,
        store: storeMeta,
        // Описание из инструкций по работе
        description: order.workInstructions || "Нет инструкций", 
        // Дополнительные поля для печати и т.п.
        applicable: false, // Чтобы не проводить документ сразу
        attributes: [
            // ИНСТРУКЦИЯ (пока заглушка, MS_WORKS_ID не используется в веб-версии)
            // { id: MS_WORKS_ID, value: order.workInstructions || "Нет инструкций" },
            
            // Бренд (MS_BRAND_ID)
            { id: MS_BRAND_ID, value: brandValue },
            
            // Дополнительные работы (MS_WORKS_ID)
        ],
        positions: positions,
    };
    
    return this.http.post(url, body);
  }

  // Создание/поиск товара (из create_product)
  private async createProduct(pos: OrderPositionData): Promise<any> {
    // В реальном коде: сначала findProductByCode. Если нет, то create.
    
    const url = `${this.apiUrl}/entity/product`;
    const body = {
        name: `${pos.name} (${pos.color})`,
        article: pos.vendorCode,
        // Ссылка на родительский товар (если это модификация)
        // ...
        attributes: [
            { id: MS_SIZE_ID, value: pos.size },
            { id: MS_COLOR_ID, value: pos.color },
            // { id: MS_BRAND_ID, value: pos.brand }, // Бренд уже есть в Заявке, но можно дублировать
            // ... другие атрибуты
        ]
    };
    return this.http.post(url, body);
  }
}

// --- Dadata Client ---

export class DadataClient {
  private token: string;
  private apiUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";

  constructor(token: string) {
    this.token = token;
  }

  async getByInn(inn: string): Promise<any | null> {
    const res = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: inn }),
    });

    if (!res.ok) {
        console.error(`Ошибка Dadata ${res.status}: ${await res.text()}`);
        return null;
    }
    
    const data = await res.json();
    return data.suggestions?.[0]?.data || null;
  }
}
