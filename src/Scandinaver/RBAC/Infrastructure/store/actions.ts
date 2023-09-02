import { Actions } from 'vuex-smart-module'
import RBACState from '@/Scandinaver/RBAC/Infrastructure/store/state'
import RBACGetters from '@/Scandinaver/RBAC/Infrastructure/store/getters'
import RBACMutations from '@/Scandinaver/RBAC/Infrastructure/store/mutations'
import { User } from '@/Scandinaver/Core/Domain/User'

export default class RBACActions extends Actions<
  RBACState,
  RBACGetters,
  RBACMutations,
  RBACActions
> {
  public initialiseRBAC(data: User): void {
    this.commit('setPermissions', data.permissionList)

    const payload = data.permissionList.map(item => ({
      action: item,
      subject: 'all',
    }))

    this.commit('clearAbility')
    this.commit('updateAbility', payload)
  }
}
