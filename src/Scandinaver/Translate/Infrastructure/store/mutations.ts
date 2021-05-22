import { Mutations } from 'vuex-smart-module'
import State from '@/Scandinaver/Translate/Infrastructure/store/state'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'
import { SET_TEXTS } from '@/Scandinaver/Translate/Infrastructure/store/mutations.type'

export default class TextMutations extends Mutations<State> {
  [SET_TEXTS](data: Translate[]) {
    this.state.texts = data
  }
}
