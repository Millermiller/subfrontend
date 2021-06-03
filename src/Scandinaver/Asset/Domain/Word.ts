import { User } from '@/Scandinaver/Core/Domain/User'
import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export class Word extends Entity {
  private _id!: number
  private _active!: boolean
  private _value!: string
  private _user: User

  constructor(word: string) {
    super()
    this.value = word
  }

  get id(): number {
    return this._id
  }

  set id(value: number) {
    this._id = value
  }

  getId(): number | string {
    return this.id
  }

  get active(): boolean {
    return this._active
  }

  set active(value: boolean) {
    this._active = value
  }

  get value(): string {
    return this._value
  }

  set value(value: string) {
    this._value = value
  }

  get user(): User {
    return this._user
  }

  set user(value: User) {
    this._user = value
  }

  getValue(): string {
    return this.value
  }
}
