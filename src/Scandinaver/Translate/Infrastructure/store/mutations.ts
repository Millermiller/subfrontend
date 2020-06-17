import { Mutations } from 'vuex-smart-module'
import State from '@/Scandinaver/Translate/Infrastructure/store/state'
import { IText } from '@/Scandinaver/Translate/Domain/Text'

export default class TextMutations extends Mutations<State> {
  setTexts(data: IText[]) {
    this.state.texts = data
  }
}
