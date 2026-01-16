import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Hall',
    component: () => import('../views/Hall.vue'), // 路由懒加载
    meta: { title: 'Mod大厅' }
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('../views/Editor.vue'),
    meta: { title: '编辑器' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { title: '我的Mod' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;