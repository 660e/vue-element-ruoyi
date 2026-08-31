import { createRouter, createWebHistory } from 'vue-router';

import { globalConfig } from '@/config/global.js';

import staticRoutes from './static.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes],
  scrollBehavior: () => ({ top: 0, left: 0 }),
});

router.beforeEach((to) => {
  const token = localStorage.getItem('token');

  if (to.name !== 'login' && !token) {
    return { name: 'login' };
  }
  if (to.name === 'login' && token) {
    return { name: 'home' };
  }

  document.title = globalConfig.app.name + (to.meta.title ? ` - ${to.meta.title}` : '');

  return true;
});

export default router;
