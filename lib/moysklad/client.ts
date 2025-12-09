export class MSClient {
  private token: string;
  private base = "https://api.moysklad.ru/api/remap/1.2";

  constructor(token: string) {
    this.token = token;
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(this.base + endpoint, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`MoySklad error ${res.status}: ${text}`);
    }

    return res.json();
  }
}
