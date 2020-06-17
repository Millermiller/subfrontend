import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export default class Translate extends Entity {
  id?: number
  value: string

  constructor(value: string) {
    super()
    this.value = value
  }

  getId(): any {
    return this.id
  }
}
