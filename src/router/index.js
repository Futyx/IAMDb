import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import homeVue from '../components/mobile/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/home.vue'),
    },
  ],
})

export default router
