import { Getters } from 'vuex-smart-module'
import State from '@/Scandinaver/Translate/Infrastructure/store/state'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'
import * as getters from '@/Scandinaver/Translate/Infrastructure/store/getters.type'

export default class TextGetters extends Getters<State> {
  get [getters.TEXTS](): Translate[] {
    return this.state.texts
  }

  get [getters.ACTIVE_TEXTS]() {
    let count = 0

    this.state.texts.forEach(
      (element: Translate, index: number, array: Translate[]) => {
        if (element.active) count++
      },
    )

    return count
  }
}
