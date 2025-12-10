/**
 * Улучшенный клиент для API МойСклад
 * Версия FF24 Enterprise SDK
 */

const DEFAULT_BASE_URL =
  process.env.MOYSKLAD_API_URL ?? "https://api.moysklad.ru/api/remap/1.2";

export interface MSClientError {
  status: number;
  code?: number;
  message: string;
  moreInfo?: string;
}

export class MSClient {
  private token: string;
  private baseUrl: string;
  private retries = 3;

  constructor(token: string, baseUrl: string = DEFAULT_BASE_URL) {
    if (!token) throw new Error("MSClient: token is required");

    this.token = token;
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  // -------------------------------------------------------
  // Вспомогательные методы
  // -------------------------------------------------------

  private buildUrl(path: string, params?: Record<string, any>): string {
    const url = new URL(
      this.baseUrl + (path.startsWith("/") ? path : `/${path}`)
    );

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private log(method: string, url: string, ms: number, status: number) {
    if (process.env.NODE_ENV !== "development") return;

    console.log(
      `[MS] ${method} ${url} → ${status} (${ms}ms)`
    );
  }

  private async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // -------------------------------------------------------
  // Централизованная обработка ошибок МойСклад
  // -------------------------------------------------------

  private async parseError(res: Response): Promise<MSClientError> {
    let json: any = {};
    try {
      json = await res.json();
    } catch {
      json = {};
    }

    const err = json.errors?.[0] ?? {};

    return {
      status: res.status,
      code: err.code,
      message: err.error || res.statusText,
      moreInfo: err.moreInfo,
    };
  }

  // -------------------------------------------------------
  // Основной метод запросов + Retry
  // -------------------------------------------------------

  private async _request(
    method: string,
    path: string,
    body?: any,
    params?: Record<string, any>
  ): Promise<any> {
    const url = this.buildUrl(path, params);

    let attempts = this.retries;

    while (attempts--) {
      const start = Date.now();

      const res = await fetch(url, {
        method,
        headers: {
          Accept: "application/json;charset=utf-8",
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${this.token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const elapsed = Date.now() - start;
      this.log(method, url, elapsed, res.status);

      // Retry: Too Many Requests
      if (res.status === 429 && attempts > 0) {
        await this.sleep(300 + Math.random() * 200);
        continue;
      }

      if (!res.ok) {
        const error = await this.parseError(res);
        throw error;
      }

      if (res.status === 204) return null;

      return res.json();
    }

    throw {
      status: 429,
      message: "Too Many Requests — retry limit exceeded",
    } as MSClientError;
  }

  // -------------------------------------------------------
  // Публичные методы API
  // -------------------------------------------------------

  get(path: string, params?: Record<string, any>) {
    return this._request("GET", path, undefined, params);
  }

  post(path: string, body?: any, params?: Record<string, any>) {
    return this._request("POST", path, body, params);
  }

  put(path: string, body?: any, params?: Record<string, any>) {
    return this._request("PUT", path, body, params);
  }
}
