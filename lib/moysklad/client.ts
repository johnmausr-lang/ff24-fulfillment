const DEFAULT_BASE_URL =
  process.env.MOYSKLAD_API_URL ?? "https://api.moysklad.ru/api/remap/1.2";

export class MSClient {
  private token: string;
  private baseUrl: string;

  constructor(token: string, baseUrl: string = DEFAULT_BASE_URL) {
    if (!token) {
      throw new Error("MSClient: token is required");
    }

    this.token = token;
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private buildUrl(path: string, params?: Record<string, any>): string {
    const url = new URL(
      this.baseUrl + (path.startsWith("/") ? path : `/${path}`)
    );

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) continue;
        url.searchParams.append(key, String(value));
      }
    }

    return url.toString();
  }

  async request(
    path: string,
    options: RequestInit = {},
    params?: Record<string, any>
  ): Promise<any> {
    const url = this.buildUrl(path, params);

    const res = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json;charset=utf-8",   // ✔ FIX
        "Content-Type": "application/json;charset=utf-8", // ✔ FIX
        Authorization: `Bearer ${this.token}`,
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      let text = "";
      try {
        text = await res.text();
      } catch {}

      throw new Error(
        `Moysklad error ${res.status}: ${text || res.statusText}`
      );
    }

    if (res.status === 204) return null;

    return res.json();
  }

  get(path: string, params?: Record<string, any>) {
    return this.request(path, { method: "GET" }, params);
  }

  post(path: string, body?: any, params?: Record<string, any>) {
    return this.request(
      path,
      {
        method: "POST",
        body: body !== undefined ? JSON.stringify(body) : undefined,
      },
      params
    );
  }

  put(path: string, body?: any, params?: Record<string, any>) {
    return this.request(
      path,
      {
        method: "PUT",
        body: body !== undefined ? JSON.stringify(body) : undefined,
      },
      params
    );
  }
}
