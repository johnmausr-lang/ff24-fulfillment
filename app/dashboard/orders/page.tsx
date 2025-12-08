"use client";

import { useEffect, useState } from "react";
import "./orders.css";

export default function OrdersListPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ================================
  // Получение списка заказов
  // ================================
  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("/api/orders/list");
        const data = await res.json();

        if (!data.ok) {
          setError("Не удалось загрузить список заказов");
        } else {
          setOrders(data.orders || []);
        }
      } catch (err) {
        setError("Ошибка при загрузке заказов");
      }

      setLoading(false);
    }

    loadOrders();
  }, []);

  // ================================
  // Загрузка
  // ================================
  if (loading) {
    return (
      <div className="page-content">
        <div className="card">
          <h2>Загрузка заказов...</h2>
        </div>
      </div>
    );
  }

  // ================================
  // Ошибка
  // ================================
  if (error) {
    return (
      <div className="page-content">
        <div className="card">
          <h2>Ошибка</h2>
          <p style={{ opacity: 0.7 }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">

      <div className="card" style={{ marginBottom: 25 }}>
        <h1 style={{ fontSize: 28 }}>Ваши заказы 📦</h1>
        <p style={{ opacity: 0.7 }}>Здесь отображаются все заказы, созданные вами.</p>

        <a className="btn-primary" href="/dashboard/orders/new" style={{ marginTop: 15 }}>
          + Создать новый заказ
        </a>
      </div>

      {/* ================================
            Таблица заказов (desktop)
      ================================ */}
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID заказа</th>
              <th>Дата</th>
              <th>Статус</th>
              <th>Позиций</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>#{o.name}</td>
                <td>{o.moment?.slice(0, 10)}</td>
                <td>
                  <span className={`status status-${o.state?.meta?.name || "new"}`}>
                    {o.state?.meta?.name || "Новый"}
                  </span>
                </td>
                <td>{o.positions?.length ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================================
            Мобильный вид — карточки
      ================================ */}
      <div className="orders-cards">
        {orders.map((o) => (
          <div className="order-card" key={o.id}>
            <div className="order-header">
              <strong>Заказ #{o.name}</strong>
              <span className={`status status-${o.state?.meta?.name || "new"}`}>
                {o.state?.meta?.name || "Новый"}
              </span>
            </div>

            <div className="order-info">
              <div>
                <label>Дата</label>
                <p>{o.moment?.slice(0, 10)}</p>
              </div>

              <div>
                <label>Позиций</label>
                <p>{o.positions?.length ?? 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
