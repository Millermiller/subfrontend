import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Learn from '@/views/Learn.vue'
import Slider from '@/components/learnpage/Slider.vue'
import Tests from '@/views/Tests.vue'
import Login from '@/views/Login.vue'
import Cards from '@/views/Cards.vue'
import Texts from '@/views/Texts.vue'
import TextItem from '@/views/Text.vue'
import Puzzles from '@/views/Puzzles.vue'
import { store } from '@/store'

import { LoginService } from '@/services/LoginService'

Vue.use(VueRouter)

const requireAuth = (to: any, _from: any, next: any) => {
  LoginService.checkAuth()
    .then(
      () => next(),
      () => next({ name: 'login' }),
    )
    .catch(() => next({ name: 'login' }))
}

const routes = [
  {
    path: '/',
    name: 'main',
    meta: {
      title: 'page401',
      noCache: true,
    },
    component: Home,
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
  {
    path: '/learn',
    name: 'LearnPage',
    component: () => import('@/views/Learn.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: ':id',
        name: 'learnAsset',
        component: () => import('@/components/learnpage/Slider.vue'),
      },
      {
        path: '',
        name: 'defaultAsset',
        component: () => import('@/components/learnpage/Slider.vue'),
      },
    ],
  },
  {
    path: '/test',
    name: 'TestsPage',
    component: Tests,
    beforeEnter: requireAuth,
    children: [
      {
        path: ':id',
        name: 'Test',
        component: () => import('@/components/testpage/Test.vue'),
      },
      {
        path: '',
        name: 'defaultTest',
        component: () => import('@/components/testpage/Test.vue'),
      },
    ],
  },
  {
    path: '/cards/:id',
    name: 'CardsPage',
    component: Cards,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: '/translates',
    name: 'TextPage',
    component: Texts,
    beforeEnter: requireAuth,
  },
  {
    path: '/translates/:id',
    name: 'TextItem',
    component: TextItem,
    beforeEnter: requireAuth,
  },
  {
    path: '/puzzle',
    name: 'PuzzlePage',
    component: Puzzles,
    beforeEnter: requireAuth,
  },
  {
    path: '*',
    redirect: '/',
  },

  // {
  //  path: '/about',
  //  name: 'about',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
