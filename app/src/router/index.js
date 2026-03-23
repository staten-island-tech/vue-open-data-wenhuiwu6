import { createRouter, createWebHistory } from 'vue-router'
import CauseOfDeath from '@/views/CauseOfDeath.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CauseOfDeath,
    },
  ],
})

export default router
