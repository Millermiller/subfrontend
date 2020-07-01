import { Module } from 'vuex-smart-module'
import State from '@/Scandinaver/Puzzle/Infrastructure/store/state'
import PuzzleGetters from '@/Scandinaver/Puzzle/Infrastructure/store/getters'
import PuzzleMutations from '@/Scandinaver/Puzzle/Infrastructure/store/mutations'
import PuzzleActions from '@/Scandinaver/Puzzle/Infrastructure/store/actions'

export const puzzleModule = new Module({
  namespaced: false,
  state: State,
  getters: PuzzleGetters,
  mutations: PuzzleMutations,
  actions: PuzzleActions,
})
