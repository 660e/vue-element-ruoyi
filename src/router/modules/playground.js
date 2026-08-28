export default {
  path: '/playground',
  children: [
    {
      path: '',
      name: 'playground',
      component: () => import('@/views/playground/index.vue'),
    },
  ],
};
