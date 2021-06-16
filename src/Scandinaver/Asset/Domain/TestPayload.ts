import { Card } from '@/Scandinaver/Asset/Domain/Card'

export class TestPayload {
  private _id: number
  private _percent: number
  private _errors: Card[] = []
  private _time: number

  set id(value: number) {
    this._id = value
  }

  get percent(): number {
    return this._percent
  }

  set percent(value: number) {
    this._percent = value
  }

  get errors(): Card[] {
    return this._errors
  }

  set errors(value: Card[]) {
    this._errors = value
  }

  set time(value: number) {
    this._time = value
  }

  public addError(value: Card) {
    this._errors.push(value)
  }

  toDTO() {
    return {
      id: this._id,
      percent: this._percent,
      errors: this._errors.map((error: Card) => error.value),
      cards: this._errors.map((error: Card) => error.getId()),
      time: this._time
    }
  }
}
