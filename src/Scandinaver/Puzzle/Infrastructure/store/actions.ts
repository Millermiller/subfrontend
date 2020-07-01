import { Actions } from 'vuex-smart-module'
import State from '@/Scandinaver/Puzzle/Infrastructure/store/state'
import PuzzleGetters from '@/Scandinaver/Puzzle/Infrastructure/store/getters'
import PuzzleMutations from '@/Scandinaver/Puzzle/Infrastructure/store/mutations'

export default class PuzzleActions extends Actions<
  State,
  PuzzleGetters,
  PuzzleMutations,
  PuzzleActions
> {}
