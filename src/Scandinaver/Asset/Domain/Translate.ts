import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export default class Translate extends Entity {
  private _id?: number
  private readonly _value: string

  constructor(value: string) {
    super()
    this._value = value
  }

  getId(): any {
    return this._id
  }

  getValue(): string {
    return this._value
  }
}
