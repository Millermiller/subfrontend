import { requireAuth } from '@/router'
import { permissions } from '@/permissions/permission.type'

export const BASE_ASSETS_PAGE = 'ASSETS_PAGE'
export const LEARN_ASSET_PAGE = 'LEARN_ASSET_PAGE'
export const DEFAULT_ASSET_PAGE = 'DEFAULT_ASSET_PAGE'
export const BASE_TESTS_PAGE = 'TESTS_PAGE'
export const TEST_PAGE = 'TEST_PAGE'
export const DEFAULT_TEST_PAGE = 'DEFAULT_TEST_PAGE'
export const PERSONAL_PAGE = 'PERSONAL_PAGE'

const routes = [
  {
    path: '/:language/assets',
    name: BASE_ASSETS_PAGE,
    component: () => import('@/Scandinaver/Asset/UI/LearnPage/learn.module.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: ':id',
        name: LEARN_ASSET_PAGE,
        component: () => import(
          '@/Scandinaver/Asset/UI/LearnPage/components/slider.component/index.vue'
        ),
      },
      {
        path: '',
        name: DEFAULT_ASSET_PAGE,
        component: () => import(
          '@/Scandinaver/Asset/UI/LearnPage/components/slider.component/index.vue'
        ),
      },
    ],
  },
  {
    path: '/:language/test',
    name: BASE_TESTS_PAGE,
    component: () => import('@Asset/UI/TestPage/test.module.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: ':id',
        name: TEST_PAGE,
        meta: {
          permission: permissions.VIEW_PAGE_TESTS,
        },
        component: () => import('@Asset/UI/TestPage/components/test.page.component/index.vue'),
      },
      {
        path: '',
        name: DEFAULT_TEST_PAGE,
        meta: {
          permission: permissions.VIEW_PAGE_TESTS,
        },
        component: () => import('@Asset/UI/TestPage/components/test.page.component/index.vue'),
      },
    ],
  },
  {
    path: '/:language/personal/:id',
    name: PERSONAL_PAGE,
    component: () => import('@/Scandinaver/Asset/UI/PersonalPage/personal.module.vue'),
    beforeEnter: requireAuth,
    props: true,
  },
]

export default routes
