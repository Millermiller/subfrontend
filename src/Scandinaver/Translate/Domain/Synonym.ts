import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import DictionaryItem from '@/Scandinaver/Translate/Domain/DictionaryItem'

export default class Synonym extends Entity {
  private _id: number
  private _value: string
  private _word: DictionaryItem

  constructor() {
    super()
    this._value = ''
  }

  getId(): number | string {
    return this.id;
  }

  get id(): number {
    return this._id
  }

  set id(value: number) {
    this._id = value
  }

  get value(): string {
    return this._value
  }

  set value(value: string) {
    this._value = value
  }

  get word(): DictionaryItem {
    return this._word
  }

  set word(value: DictionaryItem) {
    this._word = value
  }

  public toDTO() {
    return {
      id: this._id,
      value: this._value,
    }
  }
}
