import { Module } from 'vuex-smart-module'
import TextMutations from '@/Scandinaver/Translate/Infrastructure/store/mutations'
import TextGetters from '@/Scandinaver/Translate/Infrastructure/store/getters'
import State from '@/Scandinaver/Translate/Infrastructure/store/state'

export const text = new Module({
  namespaced: false,
  state: State,
  getters: TextGetters,
  mutations: TextMutations,
})
