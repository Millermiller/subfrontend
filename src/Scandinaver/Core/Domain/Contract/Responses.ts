import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'

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
    favourites: Asset
    personal: Asset[]
    texts: []
    puzzles: []
    intro: any
    sites: []
    currentsite: []
    domain: string
  }
}
