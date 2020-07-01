import { Card } from '@/Scandinaver/Asset/Domain/Card'

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
    favourites: any
    personal: []
    texts: []
    puzzles: []
    intro: any
    sites: []
    currentsite: []
    domain: string
  }
}
