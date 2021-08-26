import Login from '@/Scandinaver/Core/UI/Login.vue'
import { requireAuth } from '@/router'
import { LoginService } from '@/Scandinaver/Core/Application/login.service'
import { Container } from 'typedi'

const loginService = Container.get(LoginService)

export const LOGIN_PAGE = 'LOGIN_PAGE'
export const MAIN_PAGE = 'MAIN_PAGE'

const routes = [
  {
    path: '/login',
    name: LOGIN_PAGE,
    component: Login,
    beforeEnter(to: any, from: any, next: any) {
      loginService
        .checkAuth()
        .then(
          () => next({ name: MAIN_PAGE, params: { language: 'is' } }),
          () => next(),
        )
        .catch(() => next())
    },
  },
  {
    path: '/:language',
    name: MAIN_PAGE,
    meta: {
      title: 'page401',
      noCache: true,
    },
    component: () => import('@/Scandinaver/Dashboard/dashboard.module.vue'),
    beforeEnter: requireAuth,
  },
]

export default routes
