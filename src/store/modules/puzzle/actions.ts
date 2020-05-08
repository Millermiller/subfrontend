import { Actions } from 'vuex-smart-module'
import State from '@/store/modules/puzzle/state'
import PuzzleGetters from '@/store/modules/puzzle/getters'
import PuzzleMutations from '@/store/modules/puzzle/mutations'

export default class PuzzleActions extends Actions<
  State,
  PuzzleGetters,
  PuzzleMutations,
  PuzzleActions
> {}
