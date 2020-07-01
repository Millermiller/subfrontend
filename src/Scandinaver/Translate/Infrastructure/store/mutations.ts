import { Mutations } from 'vuex-smart-module'
import State from '@/Scandinaver/Translate/Infrastructure/store/state'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'

export default class TextMutations extends Mutations<State> {
  setTexts(data: Translate[]) {
    this.state.texts = data
  }
}
