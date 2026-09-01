export default {
  path: '/',
  children: [
    {
      path: '',
      name: 'LayoutAdmin',
      component: () => import('@/layouts/admin/index.vue'),
      redirect: { name: 'Home' },
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/home/index.vue'),
          meta: {
            title: '首页',
          },
        },
      ],
    },
    {
      path: 'login',
      name: 'Login',
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
