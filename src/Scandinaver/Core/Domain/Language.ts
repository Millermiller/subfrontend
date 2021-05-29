import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export class Language extends Entity {
  public id: number
  public title: string
  public letter: string
  public flag: string

  getId(): number | string {
    return undefined;
  }
}
