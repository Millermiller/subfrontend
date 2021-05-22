import { Mutations } from 'vuex-smart-module'
import State from '@/Scandinaver/Core/Infrastructure/store/user/state'
import { IUser } from '@/Scandinaver/Core/Domain/User'
import * as mutations from '@/Scandinaver/Core/Infrastructure/store/user/mutations.type'

export default class UserMutations extends Mutations<State> {
  [mutations.SET_USER](user: IUser) {
    this.state.user.avatar = user.avatar
    this.state.user.email = user.email
    this.state.user.id = user.id
    this.state.user.login = user.login
  }

  [mutations.RESET_USER]() {
    this.state.user.id = 0
    this.state.user.authenticated = false
    this.state.user.avatar = ''
    this.state.user.active = false
    this.state.user.active_to = ''
    this.state.user.login = ''
    this.state.user.email = ''
    this.state.user.plan = { name: '', id: 0 }
  }

  [mutations.SET_AUTH](auth: boolean) {
    this.state.user.authenticated = auth
  }

  [mutations.SET_ACTIVE](active: boolean) {
    this.state.user.active = active
  }
}
