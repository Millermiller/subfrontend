import QuestionCollection from '@/Scandinaver/Asset/Domain/QuestionCollection'
import CardsCollection from '@/Scandinaver/Asset/Domain/CardsCollection'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import Question from '@/Scandinaver/Asset/Domain/Question'
import Translate from '@/Scandinaver/Asset/Domain/Translate'

export class Test {
  constructor(asset: Asset) {
    this.asset = asset
    const translates: Translate[] = asset.cards.map(card => card.word)
    const questions: Question[] = this.asset.cards.map(
      card => new Question(card, translates),
    )
    this.questions = new QuestionCollection(questions)
    this.questions.shuffle()
  }

  asset: Asset
  questions: QuestionCollection
  answers: number = 0
  success: number = 0
  fail: number = 0
  errors: Question[] = []
  time: number

  get id(): number {
    return this.asset.id
  }

  get title(): string {
    return this.asset.title
  }

  get cards(): CardsCollection {
    return new CardsCollection(this.asset.cards)
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
