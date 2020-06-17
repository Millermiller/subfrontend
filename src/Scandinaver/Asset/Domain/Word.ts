import { User } from '@/Scandinaver/Core/Domain/User'

export default interface IWord {
  id: number
  active: boolean
  word: string
}

export class Word implements IWord {
  active!: boolean
  id!: number
  word!: string
  user: User

  constructor(word: string) {
    this.word = word
  }
}
