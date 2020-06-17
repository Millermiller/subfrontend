import DashboardModule from '@/Scandinaver/Dashboard/dashboard.module.vue'
import Login from '@/Scandinaver/Core/UI/Login.vue'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import { requireAuth } from '@/router'

const routes = [
  {
    path: '/:language',
    name: 'MainPage',
    meta: {
      title: 'page401',
      noCache: true,
    },
    // component: DashboardModule,
    component: () => import('@/Scandinaver/Dashboard/dashboard.module.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter(to: any, from: any, next: any) {
      if (store.getters.auth) {
        next({ path: '/' })
      } else {
        next()
      }
    },
  },
]

export default routes
