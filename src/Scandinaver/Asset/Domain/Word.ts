import { User } from '@/Scandinaver/Core/Domain/User'
import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export class Word extends Entity {
  active!: boolean
  id!: number
  value!: string
  user: User

  constructor(word: string) {
    super()
    this.value = word
  }

  getId(): number | string {
    return this.id;
  }

  getValue(): string {
    return this.value
  }
}
