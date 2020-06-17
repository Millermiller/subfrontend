import { Actions } from 'vuex-smart-module'
import State from '@/Scandinaver/Core/Infrastructure/store/user/state'
import UserGetters from '@/Scandinaver/Core/Infrastructure/store/user/getters'
import UserMutations from '@/Scandinaver/Core/Infrastructure/store/user/mutations'

export default class UserActions extends Actions<State, UserGetters, UserMutations, UserActions> {
  auth(isAuth: boolean) {
    this.commit('setAuth', isAuth)
  }
}
