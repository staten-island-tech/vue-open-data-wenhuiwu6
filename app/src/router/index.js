import { createRouter, createWebHistory } from 'vue-router'
import CauseOfDeath from '@/views/CauseOfDeath.vue'
import DeathData from '@'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CauseOfDeath,
    },
    {
      path: '/dth/:id',
      name: 'deathdata',
      component: DeathData,
    },
  ],
})

export default router
