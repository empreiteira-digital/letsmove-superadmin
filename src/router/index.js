import { createRouter, createWebHistory } from 'vue-router';
import Professionals from '@/views/Professionals.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/professionals', component: Professionals },
  ],
});

export default router;
