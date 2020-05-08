import { Module } from 'vuex-smart-module'
import State from '@/store/modules/puzzle/state'
import PuzzleGetters from '@/store/modules/puzzle/getters'
import PuzzleMutations from '@/store/modules/puzzle/mutations'
import PuzzleActions from '@/store/modules/puzzle/actions'

export const puzzleModule = new Module({
  namespaced: false,
  state: State,
  getters: PuzzleGetters,
  mutations: PuzzleMutations,
  actions: PuzzleActions,
})
