import { Type } from 'class-transformer'
import Synonym from '@/Scandinaver/Translate/Domain/Synonym'
import { ColorGenerator } from '@/Scandinaver/Translate/Application/color.generator'

export default class DictionaryItem {
  id: number
  text: string|null
  value: string|null
  /**
   * generated array of possible translates
   * */
  values: string[]
  color: string
  sentenceNum: number
  coordinates: number[][]
  textId: number
  private _synonyms: Synonym[] = []

  constructor() {
    this.values = []
    this.color = ColorGenerator.generate()
  }

  getValue(): string {
    return this.value
  }

  get synonyms(): Synonym[] {
    return this._synonyms
  }

  @Type(() => Synonym)
  set synonyms(value: Synonym[]) {
    this._synonyms = value
  }

  public toDTO() {
    return {
      id: this.id,
      text: this.text,
      value: this.value,
      sentenceNum: this.sentenceNum,
      coordinates: this.coordinates,
      synonyms: this._synonyms.map((synonym: Synonym) => synonym.toDTO())
    }
  }
}
