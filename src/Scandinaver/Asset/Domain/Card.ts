import { Word } from '@/Scandinaver/Asset/Domain/Word'
import Translate from '@/Scandinaver/Asset/Domain/Translate'
import { User } from '@/Scandinaver/Core/Domain/User'
import { Asset } from '@/Scandinaver/Asset/Domain/Asset'
import { Type } from 'class-transformer'
import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export class Card extends Entity {
  asset_id!: number
  id!: number
  word: Word
  @Type(() => Translate)
  translate!: Translate
  nocontrols?: boolean
  audio: string
  @Type(() => User)
  user: User
  favourite?: boolean
  asset: Asset
  exist: boolean

  getId(): number | string {
    return this.id
  }

  get subject(): string {
    return this.word.word
  }

  get value(): string {
    return this.translate.value
  }
}
