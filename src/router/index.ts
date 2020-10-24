import Vue from 'vue'
import VueRouter from 'vue-router'
import { LoginService } from '@/Scandinaver/Core/Application/login.service'
import assetRoutes from '@/Scandinaver/Asset/routes'
import coreRoutes from '@/Scandinaver/Core/routes'
import translateRoutes from '@/Scandinaver/Translate/routes'
import puzzleRoutes from '@/Scandinaver/Puzzle/routes'
import { Container } from 'typedi'

Vue.use(VueRouter)

export function requireAuth(to: any, _from: any, next: any): any {
  const loginService = Container.get(LoginService);
  loginService.checkAuth()
    .then(
      () => next(),
      () => next({ name: 'login' }),
    )
    .catch(() => next({ name: 'login' }))
}
// {
//  path: '/about',
//  name: 'about',
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
// }

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...coreRoutes,
    ...assetRoutes,
    ...translateRoutes,
    ...puzzleRoutes,
    {
      path: '*',
      redirect: '/is',
    },
  ],
})

export default router
