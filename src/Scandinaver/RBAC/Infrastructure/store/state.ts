import { Ability } from '@casl/ability'
import Permission from '@/Scandinaver/RBAC/Domain/Permission'
import Role from '@/Scandinaver/RBAC/Domain/Role'

export default class RBACState {
  roles: Role[] = []
  permissions: Permission[] = []
  ability: Ability = new Ability()
}
