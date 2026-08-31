import { getRouters } from '@/api';
import { useAppStore } from '@/stores';

function standardizeRoutes(routes) {
  return routes.map((route) => {
    switch (route.component) {
      case 'Layout': {
        console.log(route);
        break;
      }

      case 'ParentView': {
        // console.log(route)
        break;
      }

      default: {
        // console.log(route)
        break;
      }
    }
  });
}

export async function initializeRouter() {
  const { data } = await getRouters();
  const appStore = useAppStore();

  console.log(standardizeRoutes(data));

  appStore.setRoutes([1, 2, 3]);
}
