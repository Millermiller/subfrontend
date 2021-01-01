import { Module } from 'vuex-smart-module';
import RBACState from '@/Scandinaver/RBAC/Infrastructure/store/state'
import RBACMutations from '@/Scandinaver/RBAC/Infrastructure/store/mutations'
import RBACGetters from '@/Scandinaver/RBAC/Infrastructure/store/getters'
import RBACActions from '@/Scandinaver/RBAC/Infrastructure/store/actions'

export const rbacModule = new Module({
  namespaced: false,
  state: RBACState,
  getters: RBACGetters,
  mutations: RBACMutations,
  actions: RBACActions,
})
