import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const forbiddenCount = ref(0);

  function resetApp() {
    forbiddenCount.value = 0;
    localStorage.removeItem('token');
  }

  return { forbiddenCount, resetApp };
});
