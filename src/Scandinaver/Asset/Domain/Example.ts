import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export default class Example extends Entity {
  private id: number
  public text: string = ''
  public value: string = ''

  getId(): number | string {
    return this.id
  }
}
