import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const forbiddenCount = ref(0);
  const routes = ref([]);

  function resetApp() {
    forbiddenCount.value = 0;
    localStorage.removeItem('token');
  }

  function setRoutes(n) {
    routes.value = n;
  }

  return { forbiddenCount, routes, resetApp, setRoutes };
});
