import { Getters } from 'vuex-smart-module'
import State from '@/Scandinaver/Translate/Infrastructure/store/state'
import { Translate } from '@/Scandinaver/Translate/Domain/Translate'

export default class TextGetters extends Getters<State> {
  get texts(): Translate[] {
    return this.state.texts
  }

  get activeTexts() {
    let count = 0

    this.state.texts.forEach((element: Translate, index: number, array: Translate[]) => {
      if (element.active) count++
    })

    return count
  }
}
