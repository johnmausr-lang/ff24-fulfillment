// src/app/not-found.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Страница не найдена</p>
      <Button asChild>
        <Link href="/dashboard">Вернуться в личный кабинет</Link>
      </Button>
    </div>
  );
}
