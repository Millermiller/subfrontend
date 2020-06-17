import { Module } from 'vuex-smart-module'
import State from '@/Scandinaver/Asset/Infrastructure/store/test/state'
import TestGetters from '@/Scandinaver/Asset/Infrastructure/store/test/getters'
import TestMutations from '@/Scandinaver/Asset/Infrastructure/store/test/actions'

export const test = new Module({
  namespaced: false,
  state: State,
  getters: TestGetters,
  mutations: TestMutations,
})
