import { Actions } from 'vuex-smart-module'
import State from '@/Scandinaver/Puzzle/store/state'
import PuzzleGetters from '@/Scandinaver/Puzzle/store/getters'
import PuzzleMutations from '@/Scandinaver/Puzzle/store/mutations'

export default class PuzzleActions extends Actions<
  State,
  PuzzleGetters,
  PuzzleMutations,
  PuzzleActions
> {}
