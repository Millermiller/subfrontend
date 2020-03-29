import { IUser } from '@/models/User'
import { Word } from '@/models/Word'
import ISentence from '@/models/Sentence'
import { ICard } from '@/models/Card'
import { IPersonal } from '@/models/Personal'
import { IText } from '@/models/Text'

export default interface IState{
  user: IUser
  words: Word[]
  sentences: ISentence[]
  favourites: ICard[]
  personal: IPersonal[]
  texts: IText[]
  sites: string[]
  currentsite: string
  domain: string
}
