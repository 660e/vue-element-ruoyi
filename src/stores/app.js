import { defineStore } from 'pinia';

function filterHiddenRoutes(items = []) {
  return items
    .filter((item) => !item.meta?.hidden)
    .map((item) => {
      const filtered = { ...item };
      if (item.children?.length) {
        filtered.children = filterHiddenRoutes(item.children);
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

    resetApp,
    getMenus: () => filterHiddenRoutes(routes.value),
  };
});
