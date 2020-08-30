import { Mutations } from 'vuex-smart-module'
import State from '@/Scandinaver/Core/Infrastructure/store/user/state'
import { IUser } from '@/Scandinaver/Core/Domain/User'

export default class UserMutations extends Mutations<State> {
  setUser(user: IUser) {
    this.state.user.avatar = user.avatar
    this.state.user.email = user.email
    this.state.user.id = user.id
    this.state.user.login = user.login
  }

  resetUser() {
    this.state.user.id = 0
    this.state.user.authenticated = false
    this.state.user.avatar = ''
    this.state.user.active = false
    this.state.user.active_to = ''
    this.state.user.login = ''
    this.state.user.email = ''
    this.state.user.plan = { name: '', id: 0 }
  }

  setAuth(auth: boolean) {
    this.state.user.authenticated = auth
  }

  setActiveTo(date: string) {
    this.state.user.active_to = date
  }

  setActive(active: boolean) {
    this.state.user.active = active
  }

  setPlan(plan: any) {
    this.state.user.plan = plan
  }
}
