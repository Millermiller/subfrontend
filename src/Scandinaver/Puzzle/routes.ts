import { requireAuth } from '@/router'
import { permissions } from '@/permissions/permission.type'

export const PUZZLE_PAGE: string = 'PUZZLE_PAGE'

const routes = [
  {
    path: '/:language/puzzle',
    component: () => import('@Puzzle/UI/puzzle.module.vue'),
    beforeEnter: requireAuth,
    meta: {
      permission: permissions.VIEW_PAGE_PUZZLE,
    },
    children: [
      {
        path: '',
        name: PUZZLE_PAGE,
        meta: {
          permission: permissions.VIEW_PAGE_PUZZLE,
        },
        component: () => import('@Puzzle/UI/components/puzzle.page.component/index.vue'),
      }
    ]
  },
]

export default routes
