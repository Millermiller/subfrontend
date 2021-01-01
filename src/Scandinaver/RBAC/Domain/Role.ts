import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import Permission from '@/Scandinaver/RBAC/Domain/Permission'
import { Type } from 'class-transformer'
import { RoleForm } from '@/Scandinaver/RBAC/Domain/RoleForm'

export default class Role extends Entity {
  private _id: number
  private _name: string
  private _slug: string
  private _description: string
  private _permissions: Permission[]

  set id(value: number) {
    this._id = value
  }

  get description(): string {
    return this._description
  }

  set description(value: string) {
    this._description = value
  }

  get slug(): string {
    return this._slug
  }

  set slug(value: string) {
    this._slug = value
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  getId(): number | string {
    return this._id
  }

  get permissions(): Permission[] {
    return this._permissions
  }

  @Type(() => Permission)
  set permissions(value: Permission[]) {
    this._permissions = value
  }

  toDTO(): RoleForm {
    return {
      id: this._id,
      name: this._name,
      slug: this._slug,
      description: this._description,
    }
  }
}
