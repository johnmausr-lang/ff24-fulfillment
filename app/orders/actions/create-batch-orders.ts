// src/actions/orders.ts
'use server';

import { revalidatePath } from 'next/cache';
import { createOrdersInMoysklad } from '@/lib/moysklad-api';

export async function createBatchOrdersInMoysklad(orderIds: string[]) {
  // Имитируем долгую операцию (в реальности — запросы к API)
  for (let i = 0; i < orderIds.length; i++) {
    await createOrdersInMoysklad([orderIds[i]]);
    // Искусственная задержка, чтобы грузовик успел проехать
    await new Promise(r => setTimeout(r, 800));
  }

  revalidatePath('/orders');
}
