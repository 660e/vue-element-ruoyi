import { getRouters } from '@/api';
import { useAppStore } from '@/stores';

function standardizeRoutes(routes) {
  return routes.map((route) => {
    switch (route.component) {
      case 'Layout': {
        console.log(route);
        if (route.meta.link) {
          return {
            path: '/placeholder',
            name: 'Placeholder',
          };
        }
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
  const appStore = useAppStore();

  try {
    const { data } = await getRouters();
    console.log(standardizeRoutes(data));
    appStore.setRoutes([1, 2, 3]);
  } catch {
    appStore.resetApp();
  }
}
