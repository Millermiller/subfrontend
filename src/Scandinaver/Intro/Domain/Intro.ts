import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export default class Intro extends Entity {
  id: number
  page: string
  target: string
  content: string

  getId(): number | string {
    return this.id
  }
}
