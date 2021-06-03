import { Mutations } from 'vuex-smart-module'
import State from '@/Scandinaver/Puzzle/Infrastructure/store/state'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'
import { SET_PUZZLES } from '@/Scandinaver/Puzzle/Infrastructure/store/mutations.type'

export default class PuzzleMutations extends Mutations<State> {
  public [SET_PUZZLES](data: Puzzle[]): void {
    this.state.puzzles = data
  }
}
