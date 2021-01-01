import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import { PermissionGroupForm } from '@/Scandinaver/RBAC/Domain/PermissionGroupForm'

export default class PermissionGroup extends Entity {
  private _id: number
  private _name: string
  private _slug: string
  private _description: string

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

  getId(): number {
    return this._id;
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  toDTO(): PermissionGroupForm {
    return {
      id: this._id,
      name: this._name,
      slug: this._slug,
      description: this._description,
    }
  }
}
