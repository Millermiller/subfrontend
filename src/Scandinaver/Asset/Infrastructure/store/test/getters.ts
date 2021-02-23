import { Getters } from 'vuex-smart-module'
import State from '@/Scandinaver/Asset/Infrastructure/store/test/state'

export default class TestGetters extends Getters<State> {
  get percent(): number {
    return this.state.percent
  }

  get quantity(): number {
    return this.state.quantity
  }

  get level(): number {
    return this.state.level
  }

  get title(): string {
    return this.state.title
  }

  get result(): number {
    return this.state.result
  }

  get errors() {
    return this.state.errors
  }

  get time(): number {
    return this.state.time
  }
}
