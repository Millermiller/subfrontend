import { requireAuth } from '@/router'
import { permissions } from '@/permissions/permission.type'

const routes = [
  {
    path: '/:language/puzzle',
    name: 'PuzzlePage',
    component: () => import('@/Scandinaver/Puzzle/UI/PuzzleComponent.vue'),
    beforeEnter: requireAuth,
    meta: {
      permission: permissions.VIEW_PAGE_PUZZLE,
    },
  },
]

export default routes
