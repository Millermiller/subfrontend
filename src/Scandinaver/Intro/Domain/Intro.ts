import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export default class Intro extends Entity {
  id: number
  page: string
  target: string
  content: string
  position: string
  headerText: string

  getId(): number | string {
    return this.id
  }

  get params(): any {
    return {
      placement: this.position
    }
  }

  get header(): any {
    if (this.headerText === null) {
      return false
    }
    return {
      title: this.headerText
    }
  }
}
