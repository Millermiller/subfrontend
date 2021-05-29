import IPlan from '@/Scandinaver/Core/Domain/Plan'
import Role from '@/Scandinaver/RBAC/Domain/Role'
import Permission from '@/Scandinaver/RBAC/Domain/Permission'

export interface IUser {
  avatar: string
  email: string
  id: number
  login: string
  active_to: any
  active: boolean
  plan: IPlan
  roles: Role[]
  permissions: Permission[]
}

export class User implements IUser {
  avatar!: string
  email!: string
  id!: number
  login!: string
  active_to: any
  active!: boolean
  plan!: IPlan
  cardsCreated: number
  permissions: Permission[]
  roles: Role[]

  constructor(id: number, email: string, login: string, avatar: string) {
    this.id = id
    this.email = email
    this.login = login
    this.avatar = avatar
  }
}
