export default {
  path: '/',
  children: [
    {
      path: '',
      name: 'layout-admin',
      component: () => import('@/layouts/admin/index.vue'),
      redirect: { name: 'home' },
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: {
            title: '首页',
          },
        },
      ],
    },
    {
      path: 'login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        title: '登录',
      },
    },
    {
      path: ':pathMatch(.*)*',
      component: () => import('@/views/404.vue'),
    },
  ],
};
