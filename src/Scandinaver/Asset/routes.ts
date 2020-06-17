import { requireAuth } from '@/router'

const routes = [
  {
    path: '/:language/assets',
    name: 'AssetsPage',
    component: () => import('@/Scandinaver/Asset/UI/LearnPage/learn.module.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: ':id',
        name: 'learnAsset',
        component: () => import('@/Scandinaver/Asset/UI/LearnPage/slider.component/slider.component.vue'),
      },
      {
        path: '',
        name: 'defaultAsset',
        component: () => import('@/Scandinaver/Asset/UI/LearnPage/slider.component/slider.component.vue'),
      },
    ],
  },
  {
    path: '/:language/test',
    name: 'TestsPage',
    component: () => import('@/Scandinaver/Asset/UI/TestPage/Tests.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: ':id',
        name: 'Test',
        component: () => import('@/Scandinaver/Asset/UI/TestPage/TestComponent.vue'),
      },
      {
        path: '',
        name: 'defaultTest',
        component: () => import('@/Scandinaver/Asset/UI/TestPage/TestComponent.vue'),
      },
    ],
  },
  {
    path: '/:language/cards/:id',
    name: 'CardsPage',
    component: () => import('@/Scandinaver/Asset/UI/PersonalPage/CardsPage.vue'),
    beforeEnter: requireAuth,
    props: true,
  },
]

export default routes
