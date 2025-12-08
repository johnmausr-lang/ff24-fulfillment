"use client";

import { useEffect, useState } from "react";
import "./dashboard.css";
import { TruckFullscreenLoader } from "@/components/ui/truck-fullscreen-loader";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ================================
  // Загрузить данные Dashboard
  // ================================
  useEffect(() => {
    async function loadData() {
      try {
        const [pRes, oRes, iRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/orders/list"),
          fetch("/api/inventory/list"),
        ]);

        const p = await pRes.json();
        const o = await oRes.json();
        const i = await iRes.json();

        if (p.ok) setProfile(p.profile);
        if (o.ok) setOrders(o.orders || []);
        if (i.ok) setInventory(i.inventory || []);
      } catch (e) {
        console.error("Dashboard Load Error", e);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // ГРУЗОВИК ВМЕСТО СКУЧНОГО ЛОАДЕРА
  if (loading) {
    return (
      <TruckFullscreenLoader
        isLoading={true}
        message="Загружаем ваш личный кабинет FF24..."
      />
    );
  }

  // ================================
  // ОШИБКА ПРОФИЛЯ
  // ================================
  if (!profile) {
    return (
      <div className="page-content">
        <div className="card">
          <h2>Ошибка: профиль не найден</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-content">
        {/* ================================
            WELCOME CARD
        ================================ */}
        <div className="card" style={{ marginBottom: 25 }}>
          <h1 style={{ fontSize: "30px", marginBottom: 10 }}>
            Добро пожаловать, {profile.name || "Клиент"} 👋
          </h1>
          <p style={{ opacity: 0.8 }}>
            Это ваш личный кабинет Fulfillment FF24.
          </p>
        </div>

        {/* ================================
            INFO CARDS ROW
        ================================ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
            marginBottom: 30,
          }}
        >
          {/* Заказы */}
          <div className="card">
            <h3>Всего заказов</h3>
            <div style={{ fontSize: 34, fontWeight: 800, marginTop: 10 }}>
              {orders.length}
            </div>
            <p style={{ opacity: 0.6, marginTop: 8 }}>Общее количество созданных заказов</p>
          </div>

          {/* Товары на складе */}
          <div className="card">
            <h3>Позиции на складе</h3>
            <div style={{ fontSize: 34, fontWeight: 800, marginTop: 10 }}>
              {inventory.length}
            </div>
            <p style={{ opacity: 0.6, marginTop: 8 }}>Количество товаров в системе</p>
          </div>

          {/* Последний заказ */}
          <div className="card">
            <h3>Последний заказ</h3>
            {orders.length > 0 ? (
              <>
                <div style={{ marginTop: 10, fontSize: 18, fontWeight: 700 }}>
                  #{orders[0].name}
                </div>
                <p style={{ opacity: 0.6 }}>
                  {orders[0].moment?.slice(0, 10)}
                </p>
              </>
            ) : (
              <p style={{ marginTop: 10 }}>Заказов пока нет</p>
            )}
          </div>

          {/* Профиль */}
          <div className="card">
            <h3>Ваш статус</h3>
            <div style={{ fontSize: 22, marginTop: 10 }}>
              Активный клиент ✔
            </div>
            <p style={{ opacity: 0.6, marginTop: 8 }}>
              {profile.email}
            </p>
          </div>
        </div>

        {/* ================================
            LAST ORDERS LIST
        ================================ */}
        <div className="card">
          <h2 style={{ marginBottom: 20 }}>Последние заказы</h2>

          {orders.length === 0 && (
            <p style={{ opacity: 0.7 }}>У вас пока нет заказов</p>
          )}

          {orders.slice(0, 5).map((o) => (
            <div
              key={o.id}
              style={{
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                Заказ #{o.name}
              </div>
              <div style={{ opacity: 0.7, marginTop: 5 }}>
                {o.moment?.slice(0, 10)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Если вдруг где-то ещё loading — можно вызвать повторно */}
      <TruckFullscreenLoader isLoading={false} />
    </>
  );
}
