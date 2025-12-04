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
    
    return res.json();
  }
  
  get(url: string, params?: Record<string, any>): Promise<any> {
    const fullUrl = params ? `${url}?${new URLSearchParams(params).toString()}` : url;
    return this.request(fullUrl, { method: 'GET' });
  }

  post(url: string, body: any): Promise<any> {
    return this.request(url, { method: 'POST', body: JSON.stringify(body) });
  }
}

// --- Класс MoySkladClient ---

export class MoySkladClient {
  private http: MsHttpClient;
  private apiUrl: string;

  constructor(token: string) {
    this.apiUrl = MS_API_URL;
    this.http = new MsHttpClient(token);
  }
  
  // ИЩЕМ КЛИЕНТА ПО ТЕЛЕФОНУ/EMAIL (логика из find_counterparty)
  async findCounterparty(phone?: string, email?: string): Promise<any | null> {
    if (!phone && !email) return null;

    let filter = [];
    if (phone) filter.push(`phone=${phone}`);
    if (email) filter.push(`email=${email}`);
    
    const url = `${this.apiUrl}/entity/counterparty`;
    const params = { 
        filter: filter.join(';'), 
        limit: 1 
    };

    const data = await this.http.get(url, params);
    return data.rows?.[0] || null;
  }
  
  // СОЗДАЕМ КОНТРАГЕНТА (логика из create_counterparty)
  async createCounterparty(data: ClientData): Promise<any> {
    if (!data.inn) throw new ApiError("INN is required for counterparty creation.", 400);

    const isLegal = data.org_type === 'LEGAL';
    
    const body = {
        name: isLegal ? data.full_name : `ИП ${data.full_name}`,
        companyType: isLegal ? 'legal' : 'individual',
        phone: data.phone,
        email: data.email,
        inn: data.inn,
        // Дополнительные поля могут быть добавлены здесь
    };

    const url = `${this.apiUrl}/entity/counterparty`;
    return this.http.post(url, body);
  }
  
  // ПОЛУЧАЕМ ОСТАТКИ ПО СКЛАДУ (логика из check_inventory_by_store_compact)
  async checkInventory(counterpartyId: string): Promise<any[]> {
    // В реальной жизни нужен фильтр, который бы идентифицировал, 
    // что товар принадлежит именно этому counterpartyId.
    // Здесь упрощаем, беря все остатки с нашего склада.
    
    const url = `${this.apiUrl}/report/stock/all`;
    const params = {
      // Это упрощение! В продакшене нужна фильтрация по владельцу/проекту.
      'store.id': STORE_ID, 
      groupBy: 'product' 
    };
    
    const data = await this.http.get(url, params);
    return data.rows || [];
  }
  
  // ПОЛУЧАЕМ СПИСОК ДОКУМЕНТОВ (логика из get_documents)
  async getDocuments(counterpartyId: string, docType: 'supply' | 'customerorder'): Promise<any[]> {
    const url = `${this.apiUrl}/entity/${docType}`;
    // Фильтр по контрагенту (agent) - это наш клиент
    const params = {
      filter: `agent=${this.apiUrl}/entity/counterparty/${counterpartyId}`
    };
    const data = await this.http.get(url, params);
    return data.rows || [];
  }
  
  // ЗАГРУЗКА PDF (логика из get_document_pdf)
  async getDocumentPdf(documentId: string, docType: 'supply' | 'customerorder'): Promise<Buffer> {
    const url = `${this.apiUrl}/entity/${docType}/${documentId}/export?template=${PDF_TEMPLATE_ID}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${this.http['token']}`, 
            'Accept': 'application/pdf' 
        }
    });

    if (!res.ok) {
        throw new ApiError(`Ошибка загрузки PDF: ${res.status}`, res.status);
    }
    
    return Buffer.from(await res.arrayBuffer());
  }

  // --- ЛОГИКА СОЗДАНИЯ ЗАЯВКИ (из order.py и api_clients.py) ---
  
  async createSupply(counterpartyId: string, order: OrderData, positions: OrderPositionData[]): Promise<any> {
    const url = `${this.apiUrl}/entity/supply`;
    
    // 1. Создание позиций supply (включая создание товаров) - СЛОЖНАЯ ЛОГИКА
    const positionsMeta = await Promise.all(positions.map(async pos => {
        // Здесь должна быть логика поиска товара в МС по артикулу, 
        // и если его нет, вызов createProduct.
        
        // Упрощенный мок:
        const productMeta = await this.createProduct(pos);
        
        return {
            quantity: pos.quantity,
            price: 0, // Цена поступления, можно взять из конфига или оставить 0
            assortment: productMeta,
        };
    }));

    const body = {
        name: `Заявка ФФ от ${new Date().toLocaleDateString('ru-RU')}`,
        organization: { meta: { href: `${this.apiUrl}/entity/organization/${ORGANIZATION_ID}`, type: 'organization' } },
        agent: { meta: { href: `${this.apiUrl}/entity/counterparty/${counterpartyId}`, type: 'counterparty' } },
        store: { meta: { href: `${this.apiUrl}/entity/store/${STORE_ID}`, type: 'store' } },
        positions: positionsMeta,
        // Добавление кастомных полей (лейблы, работы, бренд)
        attributes: [
            // Бренд (если нужен отдельный атрибут)
            { id: MS_BRAND_ID, value: order.brand },
            // Инструкции по маркировке (MS_LABEL_INFO_ID)
            // Дополнительные работы (MS_WORKS_ID)
        ]
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
      console.error('Ошибка DaData:', await res.text());
      throw new ApiError('Ошибка сервиса DaData', res.status);
    }

    const data = await res.json();
    return data.suggestions?.[0]?.data || null;
  }
}
