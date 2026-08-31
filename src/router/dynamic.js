import { getRouters } from '@/api';
import { useAppStore } from '@/stores';

export async function initializeRouter() {
  const appStore = useAppStore();

  await getRouters();

  appStore.setRoutes([1, 2, 3]);
}
