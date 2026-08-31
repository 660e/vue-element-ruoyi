import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const isForbidden = ref(false);
  function setIsForbidden(n) {
    isForbidden.value = n;
  }

  const routes = ref([]);
  function setRoutes(n) {
    routes.value = n;
  }

  function resetApp() {
    isForbidden.value = false;
    routes.value = [];
    localStorage.removeItem('token');
  }

  return { isForbidden, setIsForbidden, routes, setRoutes, resetApp };
});
