import { Mutations } from 'vuex-smart-module';
import RBACState from '@/Scandinaver/RBAC/Infrastructure/store/state'
import Role from '@/Scandinaver/RBAC/Domain/Role'
import Permission from '@/Scandinaver/RBAC/Domain/Permission'

export default class RBACMutations extends Mutations<RBACState> {
  setRoles(data: Role[]) {
    this.state.roles = data
  }

  setPermissions(data: Permission[]) {
    this.state.permissions = data
  }

  clearAbility(): void {
    this.state.ability.update([]);
  }

  updateAbility(data: any): void {
    this.state.ability.update(data);
  }
}
