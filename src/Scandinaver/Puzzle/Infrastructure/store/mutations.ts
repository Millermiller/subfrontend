import { Mutations } from 'vuex-smart-module'
import State from '@/Scandinaver/Puzzle/Infrastructure/store/state'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'

export default class PuzzleMutations extends Mutations<State> {
  setPuzzles(data: Puzzle[]) {
    this.state.puzzles = data
  }
}
