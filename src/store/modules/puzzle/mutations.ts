import { Mutations } from 'vuex-smart-module'
import State from '@/store/modules/puzzle/state'
import { Puzzle } from '@/models/Puzzle'

export default class PuzzleMutations extends Mutations<State> {
  setPuzzles(data: Puzzle[]) {
    this.state.puzzles = data
  }
}
