"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const path = usePathname();

  const links = [
    { href: "/dashboard", label: "Главная" },
    { href: "/dashboard/orders", label: "Заказы" },
    { href: "/dashboard/stock", label: "Остатки" },
    { href: "/dashboard/supply/new", label: "Приёмка товара" },
    { href: "/dashboard/profile", label: "Профиль" },
  ];

  return (
    <aside
      className="
        w-64 bg-black/40 backdrop-blur-xl border-r border-white/10
        flex flex-col justify-between z-20
      "
    >
      <div>
        <div className="px-6 py-8 flex items-center gap-3">
          <Image
            src="/logo-ff24.png"
            alt="FF24"
            width={42}
            height={42}
            className="drop-shadow-[0_0_15px_rgba(228,255,0,0.6)]"
          />
          <span className="text-xl font-semibold tracking-wide">
            FF24
          </span>
        </div>

        <nav className="mt-4">
          {links.map((l) => {
            const active = path === l.href;

            return (
              <Link
                key={l.href}
                href={l.href}
                className={`
                  block px-6 py-3 my-1 rounded-md transition
                  ${active
                    ? "bg-white/10 text-[var(--ff24-acid)] border-l-4 border-[var(--ff24-acid)]"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-6 py-6 text-white/40 text-xs">
        © 2025 FF24 Fulfillment
      </div>
    </aside>
  );
}
