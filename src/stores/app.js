import { defineStore } from 'pinia';

function filterHiddenRoutes(routes = []) {
  return routes
    .filter((route) => !route.meta?.hidden)
    .map((route) => {
      const filtered = { ...route };
      if (route.children?.length) {
        filtered.children = filterHiddenRoutes(route.children);
        if (filtered.children.length === 0) {
          delete filtered.children;
        }
      }
      return filtered;
    });
}

export const useAppStore = defineStore('app', () => {
  const isForbidden = ref(false);
  function setIsForbidden(n) {
    isForbidden.value = n;
  }

  const routes = ref([]);
  function setRoutes(n) {
    routes.value = n;
  }

  function getMenus() {
    const menus = filterHiddenRoutes(routes.value);
    return JSON.parse(JSON.stringify(menus));
  }

  function resetApp() {
    isForbidden.value = false;
    routes.value = [];
    localStorage.removeItem('token');
  }

  return {
    isForbidden,
    setIsForbidden,

    routes,
    setRoutes,

    getMenus,
    resetApp,
  };
});
