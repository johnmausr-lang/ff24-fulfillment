"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "Пользователь не найден");
      }
    } catch {
      alert("Ошибка входа");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-form">
      <label className="login-label">Email</label>

      <input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />

      <button
        onClick={submit}
        disabled={loading}
        className="login-submit"
      >
        {loading ? "Загрузка…" : "Войти"}
      </button>
    </div>
  );
}
