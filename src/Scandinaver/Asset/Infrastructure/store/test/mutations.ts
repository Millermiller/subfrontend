import { Mutations } from 'vuex-smart-module'
import State from '@/Scandinaver/Asset/Infrastructure/store/test/state'
import * as mutations from '@/Scandinaver/Asset/Infrastructure/store/test/mutations.type'

export default class TestMutations extends Mutations<State> {
  [mutations.SET_PERCENT](data: number): void {
    this.state.percent = data
  }

  [mutations.SET_QUANTITY](data: number): void {
    this.state.quantity = data
  }

  [mutations.SET_TITLE](data: string): void {
    this.state.title = data
  }

  [mutations.SET_LEVEL](data: number): void {
    this.state.level = data
  }

  [mutations.SET_RESULT](data: number): void {
    this.state.result = data
  }

  [mutations.SET_ERROR](data: any): void {
    this.state.errors.unshift(data)
  }

  [mutations.REMOVE_ERROR](id: number): void {
    this.state.errors.splice(id, 1)
  }

  [mutations.RESET_ERROR](): void {
    this.state.errors = []
  }

  [mutations.RESET_PERCENT](): void {
    this.state.percent = 0
  }

  [mutations.SET_TIME](data: number): void {
    this.state.time = data
  }
}
