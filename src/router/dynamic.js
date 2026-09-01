import { getRouters } from '@/api';
import { useAppStore } from '@/stores';

import router from './index.js';

const views = import.meta.glob('@/views/**/index.vue', { eager: true });

function standardizeRoutes(routes = [], parentName = '') {
  return routes.map((route) => {
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
      const view = views[`/src/views/${route.component}.vue`];
      return {
        path: route.path,
        name: `${parentName}${route.name}`,
        component: view ? markRaw(view.default) : () => import('@/views/Placeholder.vue'),
        meta: {
          title: route.meta.title,
          icon: route.meta.icon,
          hidden: route.hidden,
        },
      };
    }
  });
}

export async function initializeRouter() {
  const appStore = useAppStore();

  try {
    const { data } = await getRouters();
    appStore.setRoutes(standardizeRoutes(data));
    appStore.routes.forEach((route) => router.addRoute('LayoutAdmin', route));
  } catch {
    appStore.resetApp();
  }
}
