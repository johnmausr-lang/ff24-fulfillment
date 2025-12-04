"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/client", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setError("Не удалось загрузить профиль");
          return;
        }

        const data = await res.json();
        setProfile(data);
      } catch (e) {
        setError("Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading)
    return <div className="p-6 text-lg">Загрузка профиля…</div>;

  if (error)
    return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Профиль</h1>

      <div className="bg-white shadow p-6 rounded-xl space-y-3">
        <p><b>Имя:</b> {profile?.name}</p>
        <p><b>Email:</b> {profile?.email}</p>
        <p><b>Телефон:</b> {profile?.phone}</p>
        <p><b>ИНН:</b> {profile?.inn}</p>
        <p><b>Юридический адрес:</b> {profile?.legalAddress}</p>
      </div>
    </div>
  );
}
