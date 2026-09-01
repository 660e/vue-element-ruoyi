import { getRouters } from '@/api';
import { useAppStore } from '@/stores';

const views = import.meta.glob('@/views/**/index.vue', { eager: true });

function standardizeRoutes(routes = [], parentName = '') {
  return routes.map((route) => {
    switch (route.component) {
      case 'Layout': {
        if (route.meta.link) {
          return {
            path: '/placeholder',
            name: 'Placeholder',
            component: () => import('@/views/Placeholder.vue'),
            meta: {
              title: route.meta.title,
              icon: route.meta.icon,
              hidden: route.hidden,
              frameSrc: route.meta.link,
              frameBlank: true,
            },
          };
        } else if (route.children?.length) {
          return {
            path: route.path,
            name: route.name,
            redirect: '/',
            meta: {
              title: route.meta.title,
              icon: route.meta.icon,
              hidden: route.hidden,
            },
            children: standardizeRoutes(route.children, route.name),
          };
        } else {
          console.log(route);
          return {};
        }
      }

      case 'ParentView': {
        // console.log(route);
        break;
      }

      default: {
        const view = views[`/src/views/${route.component}.vue`];
        console.log(route);
        console.log(view);
        break;
      }
    }
  });
}

export async function initializeRouter() {
  const appStore = useAppStore();

  console.log(views);

  try {
    const { data } = await getRouters();
    console.log(standardizeRoutes(data));
    appStore.setRoutes([1, 2, 3]);
  } catch {
    appStore.resetApp();
  }
}
