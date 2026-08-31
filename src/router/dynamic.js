import { getRouters } from '@/api';

export async function initializeRouter() {
  await getRouters();
}
