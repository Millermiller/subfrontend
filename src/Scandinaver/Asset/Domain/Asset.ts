import { Card } from '@/Scandinaver/Asset/Domain/Card'
import { Type } from 'class-transformer'
import { AssetType } from '@/Scandinaver/Asset/Domain/Enum/AssetType'
import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export class Asset extends Entity {
  id: number
  title: string
  type: AssetType
  level: number
  result: number
  selected?: boolean
  count: number

  @Type(() => Card)
  cards: Card[]

  getId(): number | string {
    return this.id
  }
}
