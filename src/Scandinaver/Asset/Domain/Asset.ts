import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { Type } from 'class-transformer'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'

export class Asset {
  id: number
  title: string
  type: AssetType
  level: number
  @Type(() => Card)
  cards: Card[]
  result: number
  selected?: boolean
}
