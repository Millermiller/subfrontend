import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import Question from '@/Scandinaver/Asset/Domain/Question'
import Translate from '@/Scandinaver/Asset/Domain/Translate'
import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import { Collection } from '@/Scandinaver/Core/Domain/Collection'
import { Card } from '@/Scandinaver/Asset/Domain/Card'

export class Test extends Entity {
  private _asset: Asset
  private _questions: Collection<Question>
  private _answers: number = 0
  private _success: number = 0
  private _fail: number = 0
  private _errors: Question[] = []
  private _time: number

  constructor(asset: Asset) {
    super()
    this._asset = asset
    const translates: Translate[] = asset.cards.all().map(card => card.word)
    const questions: Question[] = this._asset.cards.all().map(
      card => new Question(card, translates),
    )
    this._questions = new Collection<Question>(questions)
    this._questions.shuffle()
  }

  public getId(): number {
    return this._asset.getId()
  }

  get answers(): number {
    return this._answers
  }

  set answers(value: number) {
    this._answers = value
  }

  get success(): number {
    return this._success
  }

  set success(value: number) {
    this._success = value
  }

  get fail(): number {
    return this._fail
  }

  set fail(value: number) {
    this._fail = value
  }

  get asset(): Asset {
    return this._asset
  }

  set asset(value: Asset) {
    this._asset = value
  }

  get id(): number {
    return this._asset.id
  }

  get title(): string {
    return this._asset.title
  }

  get cards(): Collection<Card> {
    return this._asset.cards
  }

  get errors(): Question[] {
    return this._errors
  }

  set errors(value: Question[]) {
    this._errors = value
  }

  get questions(): Collection<Question> {
    return this._questions
  }

  set questions(value: Collection<Question>) {
    this._questions = value
  }

  get time(): number {
    return this._time
  }

  set time(value: number) {
    this._time = value
  }

  // количество вопросов
  get quantity(): number {
    return this._questions.count()
  }

  get percent(): number {
    return Math.floor((this.success * 100) / this.quantity)
  }

  toDTO() {
    return {
      id: this.id,
      result: this.percent,
      errors: this._errors,
      time: this._time,
    }
  }
}
