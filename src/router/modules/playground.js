export default {
  path: '/playground',
  children: [
    {
      path: '',
      name: 'Playground',
      component: () => import('@/views/playground/index.vue'),
    },
  ],
};
