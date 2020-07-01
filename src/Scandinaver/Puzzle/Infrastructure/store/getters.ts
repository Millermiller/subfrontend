import { Getters } from 'vuex-smart-module'
import State from '@/Scandinaver/Puzzle/Infrastructure/store/state'
import { Puzzle } from '@/Scandinaver/Puzzle/Domain/Puzzle'

export default class PuzzleGetters extends Getters<State> {
  get puzzles() {
    return this.state.puzzles
  }

  get active() {
    let count = 0

    this.state.puzzles.forEach((element: Puzzle, index: number, array: Puzzle[]) => {
      if (element.success) count++
    })

    return count
  }
}
