// lib/prisma.ts

import { PrismaClient } from '@prisma/client'

// Инициализируем клиент Prisma
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

// Используем singleton-паттерн для предотвращения избыточных подключений в разработке
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
