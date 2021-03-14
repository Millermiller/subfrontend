import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import Question from '@/Scandinaver/Asset/Domain/Question'
import Translate from '@/Scandinaver/Asset/Domain/Translate'
import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'
import { Collection } from '@/Scandinaver/Core/Domain/Collection'
import { Card } from '@/Scandinaver/Asset/Domain/Card'

export class Test extends Entity {
  constructor(asset: Asset) {
    super()
    this.asset = asset
    const translates: Translate[] = asset.cards.all().map(card => card.word)
    const questions: Question[] = this.asset.cards.all().map(
      card => new Question(card, translates),
    )
    this.questions = new Collection<Question>(questions)
    this.questions.shuffle()
  }

  asset: Asset
  questions: Collection<Question>
  answers: number = 0
  success: number = 0
  fail: number = 0
  errors: Question[] = []
  time: number

  public getId(): number {
    return this.asset.id
  }

  get id(): number {
    return this.asset.id
  }

  get title(): string {
    return this.asset.title
  }

  get cards(): Collection<Card> {
    return this.asset.cards
  }

  // количество вопросов
  get quantity(): number {
    return this.questions.count()
  }

  get percent(): number {
    return Math.floor((this.success * 100) / this.quantity)
  }

  toDTO() {
    return {
      id: this.id,
      result: this.percent,
      errors: this.errors,
      time: this.time,
    }
  }
}
