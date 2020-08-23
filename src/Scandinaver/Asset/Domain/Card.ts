import { Word } from '@/Scandinaver/Asset/Domain/Word'
import Translate from '@/Scandinaver/Asset/Domain/Translate'
import { User } from '@/Scandinaver/Core/Domain/User'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { Type } from 'class-transformer'
import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export class Card extends Entity {
  id!: number
  asset_id!: number
  nocontrols?: boolean
  audio: string
  favourite?: boolean
  asset: Asset
  exist: boolean

  @Type(() => Word)
  word: Word
  @Type(() => Translate)
  translate!: Translate
  @Type(() => User)
  user: User

  getId(): number | string {
    return this.id
  }

  get subject(): string {
    return this.word.getValue()
  }

  get value(): string {
    return this.translate.getValue()
  }
}
