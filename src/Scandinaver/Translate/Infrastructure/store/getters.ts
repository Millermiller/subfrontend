import { Getters } from 'vuex-smart-module'
import State from '@/Scandinaver/Translate/Infrastructure/store/state'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'
import * as getters from '@/Scandinaver/Translate/Infrastructure/store/getters.type'

export default class TextGetters extends Getters<State> {
  get [getters.TEXTS](): Translate[] {
    return this.state.texts
  }

  get [getters.ACTIVE_TEXTS](): number {
    return this.state.texts.filter((item: Translate) => item.active).length
  }
}
