import { requireAuth } from '@/router'

const routes = [
  {
    path: '/:language/translates',
    name: 'TextPage',
    component: () => import('@/Scandinaver/Translate/UI/Texts.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/:language/translates/:id',
    name: 'TextItem',
    component: () => import('@/Scandinaver/Translate/UI/Text.vue'),
    beforeEnter: requireAuth,
  },
]

export default routes
