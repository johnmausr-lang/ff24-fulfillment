"use client";

import { useState } from "react";

export default function ContactForm() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">

        <div className="bg-gradient-to-br from-purple-600 to-orange-500 p-[2px] rounded-3xl shadow-2xl">
          <div className="rounded-3xl bg-white p-10">

            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Связаться с нами
            </h2>

            <p className="text-gray-600 text-lg mb-8">
              Оставьте заявку — специалист ответит в ближайшее время
            </p>

            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Ваш email"
                className="border border-purple-200 rounded-xl px-6 py-4 text-lg shadow-inner
                           focus:outline-none focus:ring-4 focus:ring-purple-300/40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-4 rounded-xl
                           text-xl font-bold shadow-xl hover:opacity-90 transition">
                Отправить
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
