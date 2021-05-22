import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export class Language extends Entity {
  private _id: number
  private _title: string
  private _letter: string
  private _flag: string

  set id(value: number) {
    this._id = value
  }

  get title(): string {
    return this._title
  }

  set title(value: string) {
    this._title = value
  }

  get letter(): string {
    return this._letter
  }

  set letter(value: string) {
    this._letter = value
  }

  get flag(): string {
    return this._flag
  }

  set flag(value: string) {
    this._flag = value
  }

  getId(): number | string {
    return undefined;
  }
}
