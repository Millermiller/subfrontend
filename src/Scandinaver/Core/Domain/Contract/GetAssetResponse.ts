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
}
