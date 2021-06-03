import Translate from '@/Scandinaver/Asset/Domain/Translate'

export default class Variant extends Translate {
  private _correct: boolean

  set correct(value: boolean) {
    this._correct = value
  }

  public isCorrect(): boolean {
    return this._correct
  }
}
