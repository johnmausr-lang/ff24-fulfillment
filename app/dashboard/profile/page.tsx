"use client";

import { useEffect, useState } from "react";
import "./profile.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // Загрузка профиля
  // ------------------------------
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (data.ok) {
          setProfile(data.profile);
        } else {
          console.error("Ошибка загрузки профиля:", data.message);
        }
      } catch (err) {
        console.error("ProfileLoadError", err);
      }
      setLoading(false);
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="page-content">
        <div className="card loading-card">
          <div className="loader" />
          <p>Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="page-content">
        <div className="card error-card">
          <h2>Ошибка загрузки профиля</h2>
          <p>Не удалось получить информацию о клиенте.</p>
        </div>
      </div>
    );
  }

  // данные
  const {
    name,
    email,
    phone,
    inn,
    legalAddress,
    legalTitle,
    created,
    updated,
  } = profile;

  return (
    <div className="page-content">

      {/* ============================
          HEADER
      ============================ */}
      <div className="profile-header card">
        <div className="avatar">
          {name?.slice(0, 1) || "?"}
        </div>

        <div className="profile-title">
          <h1>{name}</h1>
          <p>Личный профиль клиента FF24</p>
        </div>
      </div>

      {/* ============================
          СТАТИСТИКА (Инфографика)
      ============================ */}
      <div className="stats-grid">

        <div className="stat-card card">
          <span className="stat-label">Заказов оформлено</span>
          <span className="stat-value">{profile.salesAmount ?? 0}</span>
        </div>

        <div className="stat-card card">
          <span className="stat-label">Дата регистрации</span>
          <span className="stat-value">
            {created ? created.split(" ")[0] : "--"}
          </span>
        </div>

        <div className="stat-card card">
          <span className="stat-label">Последнее обновление</span>
          <span className="stat-value">
            {updated ? updated.split(" ")[0] : "--"}
          </span>
        </div>

      </div>

      {/* ============================
          КОНТАКТНАЯ ИНФОРМАЦИЯ
      ============================ */}
      <div className="card profile-section">
        <h2>Контактная информация</h2>

        <div className="info-grid">
          <div className="info-item">
            <label>Телефон</label>
            <p>{phone || "—"}</p>
          </div>

          <div className="info-item">
            <label>Почта</label>
            <p>{email || "—"}</p>
          </div>

          <div className="info-item">
            <label>ИНН</label>
            <p>{inn || "—"}</p>
          </div>

          <div className="info-item">
            <label>Юридическое название</label>
            <p>{legalTitle || "—"}</p>
          </div>

          <div className="info-item full">
            <label>Юридический адрес</label>
            <p>{legalAddress || "—"}</p>
          </div>
        </div>
      </div>

      {/* ============================
          НАВИГАЦИЯ
      ============================ */}
      <div className="nav-buttons">
        <a className="btn-primary" href="/dashboard/orders">Мои заказы</a>
        <a className="btn-secondary" href="/dashboard/orders/new">Создать заказ</a>
      </div>

    </div>
  );
}
