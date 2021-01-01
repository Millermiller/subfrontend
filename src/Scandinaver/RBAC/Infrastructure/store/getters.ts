import { Getters } from 'vuex-smart-module'
import RBACState from '@/Scandinaver/RBAC/Infrastructure/store/state'
import Role from '@/Scandinaver/RBAC/Domain/Role'
import Permission from '@/Scandinaver/RBAC/Domain/Permission'
import { Ability } from '@casl/ability'

export default class RBACGetters extends Getters<RBACState> {
  get roles(): Role[] {
    return this.state.roles
  }

  get permissions(): Permission[] {
    return this.state.permissions
  }

  get ability(): Ability {
    return this.state.ability
  }
}
