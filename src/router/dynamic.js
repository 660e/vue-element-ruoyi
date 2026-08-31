import { getRouters } from '@/api';
import { useAppStore } from '@/stores';

function standardizeRoutes(routes) {
  console.log(routes);

  return [1, 2, 3];
}

export async function initializeRouter() {
  const { data } = await getRouters();
  const appStore = useAppStore();

  appStore.setRoutes(standardizeRoutes(data));
}
