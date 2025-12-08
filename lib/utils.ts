// src/lib/utils.ts (Исправленная версия)
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge" // <-- Исправлено: с "tw-merge" на "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
