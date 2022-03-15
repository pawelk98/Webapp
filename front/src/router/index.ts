import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Start from '../views/StartView.vue'
import Ringing from '../views/RingingView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'start',
    component: Start,
  },
  {
    path: '/',
    name: 'ringing',
    component: Ringing,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
