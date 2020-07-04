import { requireAuth } from '@/router'

const routes = [
  {
    path: '/:language/puzzle',
    name: 'PuzzlePage',
    component: () => import('@/Scandinaver/Puzzle/UI/PuzzleComponent.vue'),
    beforeEnter: requireAuth,
  },
]

export default routes