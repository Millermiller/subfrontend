import { Mutations } from 'vuex-smart-module'
import RBACState from '@/Scandinaver/RBAC/Infrastructure/store/state'
import Role from '@/Scandinaver/RBAC/Domain/Role'
import Permission from '@/Scandinaver/RBAC/Domain/Permission'

export default class RBACMutations extends Mutations<RBACState> {
  public setRoles(data: Role[]): void {
    this.state.roles = data
  }

  public setPermissions(data: string[]): void {
    this.state.permissions = data
  }

  public clearAbility(): void {
    this.state.ability.update([])
  }

  public updateAbility(data: any): void {
    this.state.ability.update(data)
  }
}
