export default [
  {
    path: '/',
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
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/playground',
    children: [
      {
        path: 'form-item',
        component: () => import('@/views/playground/FormItem.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/401.vue'),
  },
];
