import { Module } from 'vuex-smart-module'
import State from '@/Scandinaver/Puzzle/store/state'
import PuzzleGetters from '@/Scandinaver/Puzzle/store/getters'
import PuzzleMutations from '@/Scandinaver/Puzzle/store/mutations'
import PuzzleActions from '@/Scandinaver/Puzzle/store/actions'

export const puzzleModule = new Module({
  namespaced: false,
  state: State,
  getters: PuzzleGetters,
  mutations: PuzzleMutations,
  actions: PuzzleActions,
})
