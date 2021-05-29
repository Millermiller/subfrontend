import { Getters } from 'vuex-smart-module'
import State from '@/Scandinaver/Core/Infrastructure/store/user/state'
import * as getters from '@/Scandinaver/Core/Infrastructure/store/user/getters.type'

export default class UserGetters extends Getters<State> {
  get [getters.USER]() {
    return this.state.user
  }

  get [getters.IS_AUTH]() {
    return this.state.user.authenticated
  }

  get [getters.IS_ACTIVE]() {
    return this.state.user.active
  }
}
