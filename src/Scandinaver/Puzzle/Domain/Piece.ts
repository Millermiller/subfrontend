import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export default class Piece extends Entity {
  private _word: string

  constructor(word: string) {
    super()
    this._word = word
  }

  get word(): string {
    return this._word
  }

  set word(value: string) {
    this._word = value
  }

  getId(): string {
    return this._word
  }
}
