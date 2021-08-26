import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export default class Tooltip extends Entity {
  private _id: number
  private _text_id: number
  private _object: string
  private _value: string

  getId(): number | string {
    return undefined;
  }

  get id(): number {
    return this._id
  }

  set id(value: number) {
    this._id = value
  }

  get object(): string {
    return this._object
  }

  set object(value: string) {
    this._object = value
  }

  get value(): string {
    return this._value
  }

  set value(value: string) {
    this._value = value
  }

  get text_id(): number {
    return this._text_id
  }

  set text_id(value: number) {
    this._text_id = value
  }

  public toDTO() {
    return {
      id: this._id,
      object: this._object,
      value: this._value
    }
  }
}
