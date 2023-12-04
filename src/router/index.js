import { createRouter, createWebHistory } from 'vue-router';
import Professionals from '@/views/Professionals.vue';
import Admins from '@/views/Admins.vue';
import Login from '@/views/Login.vue';
import useAuthStore from '@/stores/AuthStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/profissionais' },
    { path: '/login', component: Login },
    { path: '/logout', redirect: '/login' },
    { path: '/profissionais', component: Professionals, meta: { requiresAuth: true } },
    { path: '/administradores', component: Admins, meta: { requiresAuth: true } },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.checkAuthentication();

  if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
