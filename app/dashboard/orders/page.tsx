"use client";

import { useEffect, useState } from "react";
import "./orders.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/list");
      const data = await res.json();

      if (!data.ok) throw new Error("Ошибка API");

      setOrders(data.orders);
    } catch (e) {
      console.error("Ошибка API списка заказов", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="page-content">
      <h1 className="orders-title">Мои заказы</h1>

      {loading ? (
        <div className="card loading-card">
          <div className="loader"></div>
          <p>Загружаем заказы…</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="card empty-orders">
          <h2>У вас ещё нет заказов</h2>
          <a href="/dashboard/orders/new" className="btn-primary">
            Создать первый заказ
          </a>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order: any) => (
            <div key={order.id} className="order-item card">
              <div className="order-header">
                <h2>{order.name || "Заказ"}</h2>

                <span className={`status-badge status-${order.state || "new"}`}>
                  {order.stateName || "Новый"}
                </span>
              </div>

              <div className="order-info">
                <div>
                  <label>Дата</label>
                  <p>{order.created || "—"}</p>
                </div>

                <div>
                  <label>Позиции</label>
                  <p>{order.positions?.length ?? 0}</p>
                </div>

                <div>
                  <label>Комментарий</label>
                  <p>{order.description || "—"}</p>
                </div>
              </div>

              <div className="order-actions">
                <a href={`/dashboard/orders/${order.id}`} className="btn-secondary">
                  Открыть
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
