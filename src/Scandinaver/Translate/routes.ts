import { requireAuth } from '@/router'
import { permissions } from '@/permissions/permission.type'

export const TRANSLATES_LIST_PAGE: string = 'TRANSLATES_LIST_PAGE'
export const TRANSLATE_PAGE: string = 'TRANSLATE_PAGE'

const routes = [
  {
    path: '/:language/translates',
    component: () => import('@/Scandinaver/Translate/UI/translates.module.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: ':id',
        name: TRANSLATE_PAGE,
        meta: {
          permission: permissions.VIEW_PAGE_PUZZLE,
        },
        component: () => import('@/Scandinaver/Translate/UI/translate.component/index.vue'),
      },
      {
        path: '',
        name: TRANSLATES_LIST_PAGE,
        meta: {
          permission: permissions.VIEW_PAGE_PUZZLE,
        },
        component: () => import('@/Scandinaver/Translate/UI/translates-list.component/index.vue'),
      },
    ]
  },
]

export default routes
