import { Entity } from '@/Scandinaver/Core/Domain/Contract/Entity'

export default class Intro extends Entity {
  private _id: number
  private _page: string
  private _target: string
  private _content: string
  private _position: string
  private _headerText: string

  getId(): number | string {
    return this.id
  }

  get id(): number {
    return this._id
  }

  set id(value: number) {
    this._id = value
  }

  get page(): string {
    return this._page
  }

  set page(value: string) {
    this._page = value
  }

  get target(): string {
    return this._target
  }

  set target(value: string) {
    this._target = value
  }

  get content(): string {
    return this._content
  }

  set content(value: string) {
    this._content = value
  }

  get position(): string {
    return this._position
  }

  set position(value: string) {
    this._position = value
  }

  get headerText(): string {
    return this._headerText
  }

  set headerText(value: string) {
    this._headerText = value
  }

  get params(): any {
    return {
      placement: this._position
    }
  }

  get header(): any {
    if (this._headerText === null) {
      return false
    }
    return {
      title: this._headerText
    }
  }
}
