import { Word } from '@/models/Word'
import { ITranslate } from '@/models/Translate'
import { User } from '@/models/User'

export interface ICard {
  translate: ITranslate
  id: number
  asset_id: number
  word?: Word
  exist?: boolean
  favourite?: boolean
  nocontrols?: boolean
}

export class Card implements ICard {
  asset_id!: number
  id!: number
  word: Word
  translate!: ITranslate
  nocontrols?: boolean
  audio: string
  user: User
}
