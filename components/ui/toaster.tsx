"use client";

import { useEffect, useState } from "react";

export function Toaster() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const handler = (event: CustomEvent) => {
      setMessages((prev) => [...prev, event.detail]);
      setTimeout(() => {
        setMessages((prev) => prev.slice(1));
      }, 3000);
    };

    window.addEventListener("toast", handler as any);
    return () => window.removeEventListener("toast", handler as any);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[9999] pointer-events-none">
      {messages.map((msg, i) => (
        <div
          key={i}
          className="bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-fade-in"
        >
          {msg}
        </div>
      ))}
    </div>
  );
}

// функция для вызова тостов
export function toast(message: string) {
  window.dispatchEvent(new CustomEvent("toast", { detail: message }));
}
