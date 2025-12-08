// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"   // ← ИМЕННО "tailwind-merge", а не "tw-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
