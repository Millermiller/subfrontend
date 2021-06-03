import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export default class Example extends Entity {
  private _id: number
  private _text: string = ''
  private _value: string = ''

  getId(): number | string {
    return this._id
  }

  get id(): number {
    return this._id
  }

  set id(value: number) {
    this._id = value
  }

  get text(): string {
    return this._text
  }

  set text(value: string) {
    this._text = value
  }

  get value(): string {
    return this._value
  }

  set value(value: string) {
    this._value = value
  }
}
