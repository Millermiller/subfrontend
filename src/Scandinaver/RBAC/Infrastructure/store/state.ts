import { Ability } from '@casl/ability'
import Permission from '@/Scandinaver/RBAC/Domain/Permission'
import Role from '@/Scandinaver/RBAC/Domain/Role'

export default class RBACState {
  public roles: Role[] = []
  public permissions: string[] = []
  public ability: Ability = new Ability()
}
