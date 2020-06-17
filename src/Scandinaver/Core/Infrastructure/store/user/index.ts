import { Module } from 'vuex-smart-module'
import State from '@/Scandinaver/Core/Infrastructure/store/user/state'
import UserGetters from '@/Scandinaver/Core/Infrastructure/store/user/getters'
import UserMutations from '@/Scandinaver/Core/Infrastructure/store/user/mutations'
import UserActions from '@/Scandinaver/Core/Infrastructure/store/user/actions'

export const user = new Module({
  namespaced: false,
  state: State,
  getters: UserGetters,
  mutations: UserMutations,
  actions: UserActions,
})
