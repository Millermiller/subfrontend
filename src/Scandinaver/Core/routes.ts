import Login from '@/Scandinaver/Core/UI/Login.vue'
import { requireAuth } from '@/router'
import { LoginService } from '@/Scandinaver/Core/Application/login.service'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter(to: any, from: any, next: any) {
      LoginService.checkAuth()
        .then(
          () => next({ name: 'MainPage', params: { language: 'is' } }),
          () => next(),
        )
        .catch(() => next())
    },
  },
  {
    path: '/:language',
    name: 'MainPage',
    meta: {
      title: 'page401',
      noCache: true,
    },
    component: () => import('@/Scandinaver/Dashboard/dashboard.module.vue'),
    beforeEnter: requireAuth,
  },
]

export default routes
