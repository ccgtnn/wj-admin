import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './views/LoginPage.vue'

import { routes as journalRoutes } from './modules/journals/journals.routes'

const routes = [
  {
    path: '/login',
    component: LoginPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/p',
    component: () =>
      import(/* webpackChunkName: "app" */ './views/MainLayout.vue'),
    children: [].concat(journalRoutes),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () =>
      import(/* webpackChunkName: "app" */ './views/NotFoundPage.vue'),
    meta: {
      requiresAuth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Проверяем, что пользователь авторизован при переходе на защищенный маршрут
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/login')
  } else {
    next()
  }
})

export default router
