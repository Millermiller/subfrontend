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
        component: () => import(
          '@/Scandinaver/Asset/UI/LearnPage/components/slider.component/index.vue'
        ),
      },
      {
        path: '',
        name: 'defaultAsset',
        component: () => import(
          '@/Scandinaver/Asset/UI/LearnPage/components/slider.component/index.vue'
        ),
      },
    ],
  },
  {
    path: '/:language/test',
    name: 'TestsPage',
    component: () => import('@/Scandinaver/Asset/UI/TestPage/test.module.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: ':id',
        name: 'Test',
        component: () => import('@/Scandinaver/Asset/UI/TestPage/components/test.component/index.vue'),
      },
      {
        path: '',
        name: 'defaultTest',
        component: () => import('@/Scandinaver/Asset/UI/TestPage/components/test.component/index.vue'),
      },
    ],
  },
  {
    path: '/:language/cards/:id',
    name: 'PersonalPage',
    component: () => import('@/Scandinaver/Asset/UI/PersonalPage/personal.module.vue'),
    beforeEnter: requireAuth,
    props: true,
  },
]

export default routes
