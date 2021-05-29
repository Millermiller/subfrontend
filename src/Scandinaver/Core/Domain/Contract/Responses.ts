import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { Language } from '@/Scandinaver/Core/Domain/Language'

export namespace Responses {
  export interface GetAssetResponse {
    id: number
    title: string
    type: number
    level: number
    cards: Card[]
    result: number
  }

  /**
   * TODO: set correct types
   */
  export interface GetStateResponse {
    site: string
    words: []
    sentences: []
    favourite: Asset
    personal: Asset[]
    texts: []
    puzzles: []
    intro: any
    languages: Language[]
    currentLanguage: Language
    domain: string
  }
}
