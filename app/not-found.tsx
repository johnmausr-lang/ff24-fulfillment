"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="text-center space-y-8 max-w-md">
        <h1 className="text-9xl font-bold text-red-600">404</h1>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-foreground">
            Страница не найдена
          </h2>
          <p className="text-muted-foreground">
            Похоже, вы попали на склад, где ещё не распаковали эту страницу.
          </p>
        </div>

        <div className="relative">
          <Package className="w-24 h-24 text-red-500 animate-bounce" />
          <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <Button asChild size="lg" className="bg-red-600 hover:bg-red-500">
          <Link href="/dashboard">
            Вернуться в личный кабинет
          </Link>
        </Button>
      </div>

      <p className="mt-16 text-sm text-muted-foreground">
        FF24 Fulfillment — ваш склад работает 24/7
      </p>
    </div>
  );
}
