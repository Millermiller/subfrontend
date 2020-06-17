import { Mutations } from 'vuex-smart-module'
import State from '@/Scandinaver/Puzzle/store/state'
import { Puzzle } from '@/Scandinaver/Puzzle/models/Puzzle'

export default class PuzzleMutations extends Mutations<State> {
  setPuzzles(data: Puzzle[]) {
    this.state.puzzles = data
  }
}
