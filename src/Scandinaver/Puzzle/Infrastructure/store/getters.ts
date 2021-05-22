import { Getters } from 'vuex-smart-module'
import State from '@/Scandinaver/Puzzle/Infrastructure/store/state'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'
import * as getters from '@/Scandinaver/Puzzle/Infrastructure/store/getters.type'

export default class PuzzleGetters extends Getters<State> {
  get [getters.PUZZLES]() {
    return this.state.puzzles
  }

  get [getters.ACTIVE]() {
    return this.state.puzzles.filter((puzzle: Puzzle) => puzzle.success).length
  }
}
