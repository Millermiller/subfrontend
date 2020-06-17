import Translate from '@/Scandinaver/Asset/Domain/Translate'

export default class Variant extends Translate {
  correct: boolean

  public isCorrect(): boolean {
    return this.correct
  }
}
