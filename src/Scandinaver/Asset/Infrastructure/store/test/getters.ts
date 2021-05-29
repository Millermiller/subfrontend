import { Getters } from 'vuex-smart-module'
import State from '@/Scandinaver/Asset/Infrastructure/store/test/state'
import * as getters from '@/Scandinaver/Asset/Infrastructure/store/test/getters.type'

export default class TestGetters extends Getters<State> {
  get [getters.PERCENT](): number {
    return this.state.percent
  }

  get [getters.QUANTITY](): number {
    return this.state.quantity
  }

  get [getters.LEVEL](): number {
    return this.state.level
  }

  get [getters.TITLE](): string {
    return this.state.title
  }

  get [getters.RESULT](): number {
    return this.state.result
  }

  get [getters.ERRORS]() {
    return this.state.errors
  }

  get [getters.TIME](): number {
    return this.state.time
  }
}
