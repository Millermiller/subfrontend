import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export default class Translate extends Entity {
  private _id?: number
  private _value: string

  constructor(value: string) {
    super()
    this._value = value
  }

  getId(): any {
    return this._id
  }

  set id(value: number) {
    this._id = value
  }

  set value(value: string) {
    this._value = value
  }

  getValue(): string {
    return this._value
  }
}
